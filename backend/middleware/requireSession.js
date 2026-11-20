// sprint 3 security: only checks that a session id is in the url (?session=...)
// replace it by a real check (jwt / session in db) for sprint 4
export function requireSession(req, res, next) {
    if (!req.query.session) {
        return res.status(401).json({ message: 'Session manquante' })
    }
    next()
}