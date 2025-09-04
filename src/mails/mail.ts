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
        from: `"Mon Service" <noreply@monservice.com>`,
        to: toEmail,
        subject: "Votre code OTP pour Mon Service",
        text: `Bonjour,

        Votre code OTP est : ${otp}
        Il est valable 10 minutes.

        Merci,
        L'équipe Mon Service`,
                html: `
            <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    
                    <!-- Logo -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://play-lh.googleusercontent.com/W1XZ9kFnRGbMxowaD8AHW56MZAkSw4Qf-LoRUc-S39trE3CYLKg1cNTPBwMhRebtR3I=w240-h480-rw" alt="Mon Service" style="height:50px;">
                    </div>

                    <!-- Titre -->
                    <h2 style="color: #1a73e8; text-align: center;">Code OTP</h2>

                    <p>Bonjour,</p>
                    <p>Voici votre code <strong>OTP</strong> pour accéder à votre compte :</p>

                    <!-- Code OTP stylé -->
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="
                            display: inline-block;
                            background-color: #1a73e8;
                            color: #fff;
                            padding: 15px 30px;
                            font-size: 28px;
                            font-weight: bold;
                            border-radius: 8px;
                            letter-spacing: 5px;
                        ">${otp}</span>
                    </div>

                    <!-- Bouton visuel -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <a href="#" style="
                            display: inline-block;
                            background-color: #1a73e8;
                            color: #fff;
                            padding: 10px 25px;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: bold;
                        ">Copier le code</a>
                    </div>

                    <p>Ce code est valable <strong>10 minutes</strong>.</p>
                    <p>Si vous n'avez pas demandé ce code, ignorez simplement cet email.</p>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

                    <!-- Footer -->
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        L'équipe Mon Service • <a href="https://tonsite.com" style="color:#1a73e8; text-decoration:none;">tonsite.com</a>
                    </p>
                </div>
            </div>
    `
    };


    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP envoyé à ${toEmail} - MessageId: ${info.messageId}`);
    } catch (err: any) {
        console.error("Erreur envoi OTP Nodemailer :", err);
        throw new Error("Impossible d'envoyer l'email");
    }
};
