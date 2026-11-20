// one function per email, each returns { subject, html }

const APP_NAME = process.env.APP_NAME || 'Games Awards'

// escape user text so it cannot inject html in the mail
export function esc(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

// same look for all mails
function layout(title, content) {
    return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #222;">
  <h2 style="color: #4a3aff;">${esc(title)}</h2>
  ${content}
  <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;">
  <p style="font-size: 12px; color: #888;">${esc(APP_NAME)} - message automatique, merci de ne pas répondre.</p>
</div>`
}

// newsletter (content is html, it comes from the organizer wysiwyg)
export function newsletterTemplate({ subject, content }) {
    return { subject, html: layout(subject, content) }
}