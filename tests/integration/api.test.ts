import request from 'supertest';
import app from '../../src/server';

describe('Tests d\'intégration API', () => {
    let token: string;

    // Test de la route token
    describe('POST /api/token', () => {
        test('devrait générer un token avec email valide', async () => {
            const res = await request(app)
                .post('/api/token')
                .send({ email: 'test@example.com' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            token = res.body.token;
        });
    });

    // Test de la route justify
    describe('POST /api/justify', () => {
        test('devrait justifier le texte avec token valide', async () => {
            const texte = 'Lorem ipsum dolor sit amet';
            const res = await request(app)
                .post('/api/justify')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'text/plain')
                .send(texte);

            expect(res.status).toBe(200);
            expect(typeof res.text).toBe('string');
        });
    });
});