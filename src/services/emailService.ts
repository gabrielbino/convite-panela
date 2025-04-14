import emailjs from '@emailjs/browser';

export function sendGuestEmail(
  name: string,
  email: string,
  confirmed: boolean,
  gift?: string
): Promise<void> {
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;

  const templateParams = {
    to_name: name,
    to_email: email,
    gift_name: gift || '',
  };

  let templateId = '';

  if (confirmed) {
    templateId = process.env.REACT_APP_TEMPLATE_CONFIRMED_WITH_GIFT!;
    templateParams.gift_name = gift
      ? `E agradecemos imensamente pelo presente: "${gift}"`
      : `Será uma alegria imensa contar com sua presença nesse dia tão especial.`;
  } else if (!confirmed && gift) {
    templateId = process.env.REACT_APP_TEMPLATE_GIFT_ONLY!;
    templateParams.gift_name = gift;
  } else {
    return Promise.resolve();
  }


  return emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then(() => console.log("E-mail enviado com sucesso."))
    .catch(error => console.error("Erro ao enviar e-mail:", error));
}
