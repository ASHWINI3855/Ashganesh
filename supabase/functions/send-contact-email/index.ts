import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, subject, message } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'The Corner Stone Groups <onboarding@resend.dev>', // Update this with your verified domain in production
        to: ['info@thecornerstonegroups.in'],
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #8b5cf6; padding: 20px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 24px;">New Contact Submission</h1>
            </div>
            <div style="padding: 30px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="margin-top: 20px;"><strong>Message:</strong></p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
                ${message}
              </div>
              <p style="font-size: 12px; color: #999; margin-top: 30px;">
                Submitted at: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(JSON.stringify(data))
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
