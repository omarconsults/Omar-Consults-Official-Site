// Alternative simple email solution using EmailJS or similar service
export async function sendSimpleEmail(data: any) {
  try {
    // Using a simple fetch to a contact form service
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        service: data.service,
        date: data.date,
        time: data.time,
        message: data.message,
        _subject: `New Consultation Booking - ${data.name}`,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Email error:", error)
    return false
  }
}
