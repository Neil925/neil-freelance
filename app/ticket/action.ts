"use server";

type FormDataValues = {
  name: string;
  email: string;
  phone: string;
  jobType: string;
  description: string;
};

export async function submitForm(formData: FormData) {
  const data: FormDataValues = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    jobType: formData.get("job-type") as string,
    description: formData.get("description") as string,
  };

  const payload = {
    embeds: [
      {
        title: "📥 New Job Request",
        color: 0x00bcd4, // Tailwind cyan-500
        fields: [
          { name: "👤 Name", value: data.name || "N/A", inline: true },
          { name: "📧 Email", value: data.email || "N/A", inline: true },
          { name: "📱 Phone", value: data.phone || "N/A", inline: true },
          { name: "💼 Job Type", value: data.jobType || "N/A", inline: true },
          { name: "📝 Description", value: data.description || "N/A" },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(
      "https://discord.com/api/webhooks/1359626874036420618/k-UEmpbYKpgfajoDfgS0D5MrNUgNs8-Ky-P0LBGVAetqloroTlc2gPEj75S13TRAKguZ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      console.error("Failed to send to Discord:", await res.text());
      throw new Error("Discord webhook failed");
    }

    return { success: true, message: "Submitted successfully" };
  } catch (err) {
    console.error("Webhook error:", err);
    return { success: false, message: "Something went wrong" };
  }
}
