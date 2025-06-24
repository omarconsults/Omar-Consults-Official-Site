import { Resend } from "resend"

// Initialize Resend with the API key
const resend = new Resend(process.env.RESEND_API_KEY || "re_Hs4vR5pf_PR2raebMtGPEtHUmz3z1PX7s")

export interface BookingData {
  name: string
  email: string
  company?: string
  phone?: string
  service: string
  date: string
  time: string
  message?: string
}

export async function sendBookingEmail(data: BookingData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Omar Consults <onboarding@resend.dev>", // Using Resend's default domain
      to: ["omarbnfconsults@gmail.com"], // Changed to your verified email address
      subject: `New Consultation Booking - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Consultation Booking
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
          </div>

          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">Booking Details</h3>
            <p><strong>Service:</strong> ${getServiceName(data.service)}</p>
            <p><strong>Preferred Date:</strong> ${new Date(data.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            <p><strong>Preferred Time:</strong> ${data.time}</p>
          </div>

          ${
            data.message
              ? `
            <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #7b1fa2; margin-top: 0;">Project Details</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
          `
              : ""
          }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This booking was submitted through the Omar Consults website on ${new Date().toLocaleString()}.
            </p>
            <p style="color: #666; font-size: 14px;">
              <strong>Reply to client:</strong> ${data.email}
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Email sending error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: "Failed to send email" }
  }
}

function getServiceName(serviceId: string): string {
  const services: Record<string, string> = {
    "ai-consulting": "AI Strategy & Consulting",
    "software-development": "Custom Software Development",
    "cloud-solutions": "Cloud Solutions",
    "digital-marketing": "Digital Marketing",
  }
  return services[serviceId] || serviceId
}
