import express from 'express';
import { TextJustifier } from '../services/textJustifier';
import { tokenService } from '../services/tokenServices'; 

const router = express.Router();
const justifier = new TextJustifier();

router.post('/justify', async (req, res) => {
    try {
        
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Token manquant' });
        }

        const token = authHeader.split(' ')[1];
        if (!tokenService.verifyToken(token)) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        
        const text = req.body;
        if (typeof text !== 'string') {
            return res.status(400).json({ error: 'Le texte doit être une chaîne de caractères' });
        }

        
        const words = text.trim().split(/\s+/).length;
        if (!tokenService.incrementWordCount(token, words)) { // Changement ici
            return res.status(402).json({ error: 'Limite de mots dépassée' });
        }

        
        const justifiedText = justifier.justify(text);

        res.type('text/plain').send(justifiedText);
    } catch (error) {
        console.error('Erreur de justification:', error);
        res.status(500).json({ error: 'Erreur lors de la justification du texte' });
    }
});

export default router;