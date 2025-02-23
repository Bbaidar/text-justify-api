import { tokenService } from '../src/services/tokenServices';

describe('TokenService Tests', () => {
    test('devrait générer un token valide', () => {
        const token = tokenService.generateToken('test@example.com');
        expect(typeof token).toBe('string');
        expect(token.length).toBeGreaterThan(0);
    });

    test('devrait vérifier un token valide', () => {
        const token = tokenService.generateToken('test@example.com');
        expect(tokenService.verifyToken(token)).toBeTruthy();
    });

    test('devrait compter les mots correctement', () => {
        const token = tokenService.generateToken('test@example.com');
        expect(tokenService.incrementWordCount(token, 1000)).toBeTruthy();
    });

    test('devrait rejeter les mots dépassant la limite', () => {
        const token = tokenService.generateToken('test@example.com');
        expect(tokenService.incrementWordCount(token, 90000)).toBeFalsy();
    });
});