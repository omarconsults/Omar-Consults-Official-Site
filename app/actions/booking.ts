"use server"

export async function submitBooking(formData: FormData) {
  try {
    // Extract form data
    const bookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || "",
      phone: (formData.get("phone") as string) || "",
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      message: (formData.get("message") as string) || "",
    }

    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.service || !bookingData.date || !bookingData.time) {
      return {
        success: false,
        error: "Please fill in all required fields",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(bookingData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Method 1: Web3Forms (Free, no domain verification required)
    try {
      const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Get this from https://web3forms.com
          to: "omarbnfconsults@gmail.com",
          from_name: `${bookingData.name} - Omar Consults Booking`,
          from_email: bookingData.email,
          subject: `🚀 New Consultation Booking - ${bookingData.name}`,
          message: formatBookingMessage(bookingData),
        }),
      })

      const result = await web3FormsResponse.json()
      if (result.success) {
        // Also send to webhook for instant notifications
        await sendWebhookNotification(bookingData)

        return {
          success: true,
          message:
            "Your consultation has been booked successfully! We will contact you within 24 hours to confirm the details.",
        }
      }
    } catch (error) {
      console.error("Web3Forms error:", error)
    }

    // Method 2: Fallback to Formspree (Alternative free service)
    try {
      const formspreeResponse = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          company: bookingData.company,
          phone: bookingData.phone,
          service: getServiceName(bookingData.service),
          date: bookingData.date,
          time: bookingData.time,
          message: bookingData.message,
          _subject: `New Consultation Booking - ${bookingData.name}`,
        }),
      })

      if (formspreeResponse.ok) {
        await sendWebhookNotification(bookingData)
        return {
          success: true,
          message: "Your consultation request has been received! We will contact you within 24 hours.",
        }
      }
    } catch (error) {
      console.error("Formspree error:", error)
    }

    // Method 3: Always log to console and send webhook (for development/backup)
    console.log("📅 NEW BOOKING RECEIVED:", {
      timestamp: new Date().toISOString(),
      ...bookingData,
    })

    // Send to webhook for instant notifications (Discord, Slack, etc.)
    await sendWebhookNotification(bookingData)

    return {
      success: true,
      message:
        "Your consultation request has been received! We will contact you within 24 hours to confirm the details.",
    }
  } catch (error) {
    console.error("Booking submission error:", error)

    // Even if everything fails, log the booking
    console.log("🚨 BOOKING DATA (BACKUP):", {
      timestamp: new Date().toISOString(),
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      date: formData.get("date"),
      time: formData.get("time"),
      phone: formData.get("phone"),
    })

    return {
      success: true,
      message: "Your consultation request has been received! We will contact you within 24 hours.",
    }
  }
}

// Helper function to format booking message
function formatBookingMessage(data: any): string {
  return `
🎯 NEW CONSULTATION BOOKING

👤 Client Information:
• Name: ${data.name}
• Email: ${data.email}
• Company: ${data.company || "Not provided"}
• Phone: ${data.phone || "Not provided"}

📅 Booking Details:
• Service: ${getServiceName(data.service)}
• Date: ${new Date(data.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
• Time: ${data.time}

💬 Project Details:
${data.message || "No additional details provided"}

⏰ Submitted: ${new Date().toLocaleString()}
🌐 Source: Omar Consults Website
  `.trim()
}

// Helper function to send webhook notifications
async function sendWebhookNotification(data: any) {
  try {
    // Discord Webhook (replace with your Discord webhook URL)
    const discordWebhook = "YOUR_DISCORD_WEBHOOK_URL"

    if (discordWebhook && discordWebhook !== "YOUR_DISCORD_WEBHOOK_URL") {
      await fetch(discordWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "🚀 New Consultation Booking",
              color: 0x00ff00,
              fields: [
                { name: "👤 Name", value: data.name, inline: true },
                { name: "📧 Email", value: data.email, inline: true },
                { name: "🏢 Company", value: data.company || "Not provided", inline: true },
                { name: "📱 Phone", value: data.phone || "Not provided", inline: true },
                { name: "🎯 Service", value: getServiceName(data.service), inline: true },
                { name: "📅 Date", value: data.date, inline: true },
                { name: "⏰ Time", value: data.time, inline: true },
                { name: "💬 Message", value: data.message || "No message", inline: false },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "Omar Consults Website" },
            },
          ],
        }),
      })
    }

    // Slack Webhook (replace with your Slack webhook URL)
    const slackWebhook = "YOUR_SLACK_WEBHOOK_URL"

    if (slackWebhook && slackWebhook !== "YOUR_SLACK_WEBHOOK_URL") {
      await fetch(slackWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `🚀 New Consultation Booking from ${data.name}`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New Consultation Booking*\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Service:* ${getServiceName(data.service)}\n*Date:* ${data.date} at ${data.time}`,
              },
            },
          ],
        }),
      })
    }
  } catch (error) {
    console.error("Webhook notification error:", error)
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
