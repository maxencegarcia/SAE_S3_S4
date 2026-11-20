import 'dotenv/config'
import { sendNewsletter } from '../mail/mail.service.js'

// usage: node scripts/test-mails.js moi@gmail.com autre@gmail.com
const recipients = process.argv.slice(2)
if (recipients.length === 0) {
    console.error('usage: node scripts/test-mails.js adresse1 [adresse2 ...]')
    process.exit(1)
}

const result = await sendNewsletter({
    recipients,
    subject: 'Newsletter de test',
    content: '<p>Le <strong>programme</strong> est en ligne !</p>'
})

console.log(result)