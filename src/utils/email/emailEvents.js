import { EventEmitter } from "node:events";
import { sendEmail } from "../../services/sendEmail.js";
import { GenerateToken } from "../jwt/generate.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("confirmEmail", async (to) => {
    const subject = "Confirm your email";
    const token = GenerateToken({ payload: { email: to }, options: { expiresIn: 60*3 } });
    const link = `${process.env.BASE_URL}/users/confirmEmail/${token}`;
    const html = `<p>Click <a href="${link}">here</a> to confirm your email.</p>`;
    const text = `Please confirm your email by clicking the link, Note that the link will expire in 3 minutes`;
    const isSent = await sendEmail({ to, subject, html, text });
    if (isSent) {
        console.log(`Confirmation email sent to ${to}`);
    } else {
        console.error(`Failed to send confirmation email to ${to}`);
    }
});