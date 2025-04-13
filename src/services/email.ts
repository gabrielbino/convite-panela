import emailjs from '@emailjs/browser';

export function sendConfirmationEmail(name: string, email: string, gift: string) {
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;

  return emailjs.send(serviceId, templateId, {
    to_name: name,
    to_email: email,
    gift_name: gift,
  }, publicKey);
}
