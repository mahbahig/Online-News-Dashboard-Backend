import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const info = await transporter.sendMail({
        from: `"Mahmoud Bahig" <${process.env.EMAIL_USER}>`,
        to: to || process.env.EMAIL_USER,
        subject: subject || "Confirm your email",
        text: text || "Please confirm your email!",
        html: html
    });

    if (info.accepted.length > 0) {
        return true;
    } else {
        return false;
    }
}