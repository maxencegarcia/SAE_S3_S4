import nodemailer from 'nodemailer'

// we keep the promise so the transporter is created only once
let transporterPromise = null

async function createTransporter() {
    // real smtp settings from .env (gmail, mailtrap, ...)
    if (process.env.MAIL_HOST) {
        const port = Number(process.env.MAIL_PORT) || 587
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port,
            secure: port === 465, // true only for port 465
            auth: process.env.MAIL_USER
                ? { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
                : undefined
        })
    }

    // no .env settings: create a free ethereal test account automatically
    const account = await nodemailer.createTestAccount()
    console.log(`[mail] ethereal test account created: ${account.user}`)
    return nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass }
    })
}

// other files call this to get the shared transporter
export function getTransporter() {
    if (!transporterPromise) transporterPromise = createTransporter()
    return transporterPromise
}