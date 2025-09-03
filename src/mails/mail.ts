import nodemailer from "nodemailer";

if (!process.env.MAIL_HOST || !process.env.MAIL_PORT || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("Variables SMTP manquantes dans .env");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "yannhallage4@gmail.com",
        pass: "bmab rjvz fqij rjdr",
    },
});

export const sendEmail = async (toEmail: string, otp: string) => {
    const mailOptions = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM}>`,
        to: toEmail,
        subject: "Votre code OTP",
        text: `Votre code OTP est : ${otp}`,
        html: `<p>Votre code OTP est : <strong>${otp}</strong></p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP envoyé à ${toEmail} - MessageId: ${info.messageId}`);
    } catch (err: any) {
        console.error("Erreur envoi OTP Nodemailer :", err);
        throw new Error("Impossible d'envoyer l'email");
    }
};
