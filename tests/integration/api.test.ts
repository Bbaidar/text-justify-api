import request from 'supertest';
import app from '../../src/server';

describe('Tests d\'intégration API', () => {
    let token: string;

    describe('POST /api/token', () => {
        test('devrait générer un token avec email valide', async () => {
            const res = await request(app)
                .post('/api/token')
                .send({ email: 'test@example.com' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            token = res.body.token;
        });

        test('devrait rejeter un email invalide', async () => {
            const res = await request(app)
                .post('/api/token')
                .send({ email: 'invalid-email' });

            expect(res.status).toBe(400);
        });

        test('devrait rejeter une requête sans email', async () => {
            const res = await request(app)
                .post('/api/token')
                .send({});

            expect(res.status).toBe(400);
        });
    });

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

        test('devrait rejeter une requête sans token', async () => {
            const res = await request(app)
                .post('/api/justify')
                .set('Content-Type', 'text/plain')
                .send('Test text');

            expect(res.status).toBe(401);
        });

        test('devrait rejeter un token invalide', async () => {
            const res = await request(app)
                .post('/api/justify')
                .set('Authorization', 'Bearer invalid-token')
                .set('Content-Type', 'text/plain')
                .send('Test text');

            expect(res.status).toBe(401);
        });

        test('devrait gérer la limite de mots', async () => {
            const longText = 'word '.repeat(80001);
            const res = await request(app)
                .post('/api/justify')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'text/plain')
                .send(longText);

            expect(res.status).toBe(402);
        });

        test('devrait rejeter un texte non-string', async () => {
            const res = await request(app)
                .post('/api/justify')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'text/plain')
                .send({ text: 'Invalid input' });

            expect(res.status).toBe(400);
        });
    });
});