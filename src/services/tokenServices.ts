import crypto from 'crypto';

interface TokenData {
    email: string;
    wordCount: number;
    createdAt: Date;
}

class TokenService {
    private tokens: Map<string, TokenData>;
    private static instance: TokenService;

    private constructor() {
        this.tokens = new Map();
    }

    static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    generateToken(email: string): string {
        const token = crypto.randomBytes(32).toString('hex');
        this.tokens.set(token, {
            email,
            wordCount: 0,
            createdAt: new Date()
        });
        return token;
    }

    verifyToken(token: string): boolean {
        return this.tokens.has(token);
    }

    incrementWordCount(token: string, count: number): boolean {
        const tokenData = this.tokens.get(token);
        if (!tokenData) return false;

        const WORD_LIMIT = 80000;
        if (tokenData.wordCount + count > WORD_LIMIT) {
            return false;
        }

        tokenData.wordCount += count;
        return true;
    }

    getWordCount(token: string): number {
        return this.tokens.get(token)?.wordCount || 0;
    }

    cleanExpiredTokens(): void {
        const now = Date.now();
        const dayInMs = 24 * 60 * 60 * 1000;
        
        this.tokens.forEach((data, token) => {
            if (now - data.createdAt.getTime() > dayInMs) {
                this.tokens.delete(token);
            }
        });
    }
}

export const tokenService = TokenService.getInstance();