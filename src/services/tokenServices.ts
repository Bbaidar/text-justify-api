import * as crypto from 'crypto';
interface TokenData {
    email: string;
    wordCount: number;
    createdAt: Date;
}

class TokenService {
    private static instance: TokenService;
    private tokens: Map<string, TokenData>;

    private constructor() {
        this.tokens = new Map();
    }

    public static getInstance(): TokenService {
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

    getWordCount(token: string): number {
        const data = this.tokens.get(token);
        return data ? data.wordCount : 0;
    }

    incrementWordCount(token: string, count: number): boolean {
        const data = this.tokens.get(token);
        if (!data) return false;
        
        const newCount = data.wordCount + count;
        if (newCount > 80000) return false;

        data.wordCount = newCount;
        this.tokens.set(token, data);
        return true;
    }
}

export const tokenService = TokenService.getInstance();