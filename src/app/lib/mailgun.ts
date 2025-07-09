import formData from "form-data";               // npm i form-data
import Mailgun from "mailgun.js";               // npm i mailgun.js @types/mailgun.js

const mg = new Mailgun(formData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,            // set in .env.local + Vercel
  url: "https://api.eu.mailgun.net"
});

export async function sendVerificationEmail(to: string, token: string) {
  const domain = process.env.MAILGUN_DOMAIN!;
  const verifyUrl = `${process.env.BASE_URL}/api/verify?token=${token}`;

  await mg.messages.create(domain, {
    from: `no-reply@${domain}`,
    to,
    subject: "Verify your account",
    text: `Click this link within 30 minutes: ${verifyUrl}`,
  });
}