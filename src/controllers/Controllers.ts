import { Request, Response } from 'express';
import { TextJustifier } from '../services/textJustifier';
import { tokenService } from '../services/tokenServices';

const justifier = new TextJustifier();

export const justifyTextHandler = (req: Request, res: Response) => {
    try {
        const text = req.body;
        
        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: "Texte invalide" });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Token manquant" });
        }

        const wordCount = text.trim().split(/\s+/).length;
        if (!tokenService.incrementWordCount(token, wordCount)) {
            return res.status(402).json({ error: "Limite de mots dépassée" });
        }

        const justifiedText = justifier.justify(text);
        res.setHeader('Content-Type', 'text/plain');
        res.send(justifiedText);

    } catch (error) {
        console.error('Erreur de justification:', error);
        res.status(500).json({ error: "Erreur interne" });
    }
};

export const wordCountHandler = (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Token manquant" });
        }

        const count = tokenService.getWordCount(token);
        res.json({ wordCount: count });

    } catch (error) {
        console.error('Erreur de comptage:', error);
        res.status(500).json({ error: "Erreur interne" });
    }
};