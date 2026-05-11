import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = 'https://vlhjsfkwvsiqbhrbhudk.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
  console.error("Error: Please provide SUPABASE_SERVICE_ROLE_KEY environment variable.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const MAPPINGS = [
  // Services Section
  { localPath: 'src/assets/images/maldives_recruitment.jpg', bucket: 'services-images', folder: 'service-1', section: 'services', type: 'image' },
  { localPath: 'src/assets/images/singapore_study.jpg', bucket: 'services-images', folder: 'service-2', section: 'services', type: 'image' },
  { localPath: 'public/images/study-abroad.jpg', bucket: 'services-images', folder: 'service-3', section: 'services', type: 'image' },
  { localPath: 'public/images/recruitment-1.jpg', bucket: 'services-images', folder: 'service-4', section: 'services', type: 'image' },
  { localPath: 'public/images/soft-skills.jpg', bucket: 'services-images', folder: 'service-5', section: 'services', type: 'image' },
  
  // Others
  { localPath: 'src/assets/hero.png', bucket: 'homepage-images', folder: 'hero', section: 'hero', type: 'image' },
  { localPath: 'src/assets/images/logo.jpg', bucket: 'homepage-images', folder: 'banners', section: 'logo', type: 'image' },
  { localPath: 'public/why-choose-us.mp4', bucket: 'why-choose-us-videos', folder: 'main', section: 'why_choose_us', type: 'video' },
]

async function uploadAndRegister() {
  for (const item of MAPPINGS) {
    const fullPath = path.resolve(__dirname, item.localPath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}, skipping...`)
      continue
    }

    const fileName = path.basename(fullPath)
    const storagePath = `${item.folder}/${fileName}`

    // 1. Upload to Storage
    const fileBuffer = fs.readFileSync(fullPath)
    
    let contentType = 'image/jpeg';
    if (fileName.endsWith('.png')) contentType = 'image/png';
    if (fileName.endsWith('.mp4')) contentType = 'video/mp4';

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(item.bucket)
      .upload(storagePath, fileBuffer, {
        upsert: true,
        contentType: contentType
      })

    if (uploadError) {
      console.error(`Failed to upload ${fileName} to ${item.bucket}:`, uploadError.message)
      continue
    }

    console.log(`Uploaded ${fileName} to ${item.bucket}/${storagePath}`)

    const { data: urlData } = supabase.storage.from(item.bucket).getPublicUrl(storagePath)

    // 2. Insert into DB (Check existence first)
    const dbRecord = {
      section: item.section,
      type: item.type,
      file_path: storagePath,
      public_url: urlData.publicUrl
    }

    const { data: existing } = await supabase.from('media_assets').select('id').eq('file_path', storagePath).single()

    let dbError;
    if (existing) {
      const res = await supabase.from('media_assets').update(dbRecord).eq('id', existing.id)
      dbError = res.error;
    } else {
      const res = await supabase.from('media_assets').insert([dbRecord])
      dbError = res.error;
    }

    if (dbError) {
      console.error(`Failed to insert/update DB record for ${fileName}:`, dbError.message)
    } else {
      console.log(`Registered ${fileName} in media_assets (section: ${item.section})`)
    }
  }
  
  console.log('Migration completed!')
}

uploadAndRegister()
