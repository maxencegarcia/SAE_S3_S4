import nodemailer from 'nodemailer'
import { getTransporter } from './mail.config.js'
import { newsletterTemplate } from './mail.templates.js'

// gmail replaces the sender by the logged account, so keep them the same
const DEFAULT_FROM = '"Games Awards" <no-reply@gamesawards.local>'

// plain text version for mail clients that do not show html
function htmlToText(html) {
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

// generic function: every other mail function uses it
export async function sendMail({ to, subject, html, text }) {
    const transporter = await getTransporter()

    const info = await transporter.sendMail({
        from: process.env.MAIL_FROM || DEFAULT_FROM,
        to,
        subject,
        html,
        text: text || htmlToText(html)
    })

    // only ethereal gives a preview url (false otherwise)
    const previewUrl = nodemailer.getTestMessageUrl(info) || null
    if (previewUrl) console.log(`[mail] preview: ${previewUrl}`)

    return { messageId: info.messageId, previewUrl }
}

// newsletter: one mail per person so nobody sees the other addresses
export async function sendNewsletter({ recipients, subject, content }) {
    if (!Array.isArray(recipients) || recipients.length === 0) {
        throw new Error('recipients must be a non-empty array')
    }
    const { html } = newsletterTemplate({ subject, content })

    const sent = []
    const failed = []
    for (const to of new Set(recipients)) { // set removes duplicates
        try {
            const { previewUrl } = await sendMail({ to, subject, html })
            sent.push({ to, previewUrl })
        } catch (err) {
            failed.push({ to, error: err.message }) // one failure must not stop the others
        }
    }
    return { sent, failed }
}