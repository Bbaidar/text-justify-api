import express, { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { tokenService } from '../services/tokenServices';

interface TokenRequest extends Request {
    body: {
        email?: string;
    }
}

const router: Router = express.Router();


const generateTokenHandler: RequestHandler = (
    req: TokenRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: "Email requis" });
            return;
        }

      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: "Format d'email invalide" });
            return;
        }

        const token = tokenService.generateToken(email);
        res.json({ token });
    } catch (error) {
        console.error('Erreur de génération du token:', error);
        res.status(500).json({ error: "Erreur interne" });
    }
};

const verifyTokenHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: "Token manquant" });
            return;
        }

        if (!tokenService.verifyToken(token)) {
            res.status(401).json({ error: "Token invalide" });
            return;
        }

        next();
    } catch (error) {
        console.error('Erreur de vérification du token:', error);
        res.status(500).json({ error: "Erreur interne" });
    }
};


router.post('/token', generateTokenHandler);


export { verifyTokenHandler };
export default router;