import type { Answer, UtmParams } from "../types";

interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  recommendedUnitName?: string;
  ctaSource: string;
  utmParams: UtmParams;
  answers: Answer[];
}

const ENDPOINT =
  import.meta.env.VITE_GOOGLE_SHEET_ENDPOINT as string | undefined;

export async function submitLeadToGoogleSheet(
  lead: LeadSubmission
): Promise<void> {
  console.log("Google Sheet endpoint:", ENDPOINT);

  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    recommendedUnitName: lead.recommendedUnitName || "",
    ctaSource: lead.ctaSource || "",
    utmSource: lead.utmParams?.utm_source || "",
    utmMedium: lead.utmParams?.utm_medium || "",
    utmCampaign: lead.utmParams?.utm_campaign || "",
    answers: lead.answers || []
  };

  console.log("Sending payload:", payload);
  if (!ENDPOINT) {
    console.warn("Google Sheet endpoint is not defined. Skipping submission.");
    return;
  }

  await fetch(ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  console.log("Google Sheet request sent");
}