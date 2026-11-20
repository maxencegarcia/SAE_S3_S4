import { Router } from 'express'
import { sendNewsletter } from '../mail/mail.service.js'
import { requireSession } from '../middleware/requireSession.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// db is the mysql connection created in server.js
export default function newsletterRoutes(db) {
    const router = Router()

    // public: a visitor subscribes to the newsletter
    router.post('/subscribe', async (req, res) => {
        const mail = String(req.body.mail || '').trim().toLowerCase()
        if (!EMAIL_REGEX.test(mail)) {
            return res.status(400).json({ message: 'Adresse e-mail invalide' })
        }

        try {
            await db.execute('INSERT INTO newsletter_inscrit (mail) VALUES (?)', [mail])
            res.status(201).json({ message: 'Inscription enregistrée' })
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') { // mail column is unique
                return res.status(409).json({ message: 'Adresse déjà inscrite' })
            }
            console.error(err)
            res.status(500).json({ message: 'Erreur serveur' })
        }
    })

    // organizer: send a newsletter to every subscriber
    router.post('/send', requireSession, async (req, res) => {
        const subject = String(req.body.subject || '').trim()
        const content = String(req.body.content || '').trim()
        if (!subject || !content) {
            return res.status(400).json({ message: 'Objet et contenu obligatoires' })
        }

        try {
            const [rows] = await db.query('SELECT mail FROM newsletter_inscrit')
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Aucun inscrit à la newsletter' })
            }

            const result = await sendNewsletter({
                recipients: rows.map(row => row.mail),
                subject,
                content
            })

            res.json({
                total: rows.length,
                sent: result.sent.length,
                failed: result.failed,
                previewUrls: result.sent.map(s => s.previewUrl).filter(Boolean) // ethereal only
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: "Erreur lors de l'envoi" })
        }
    })

    return router
}