import request from 'supertest';
import app from '../src/server';  

describe('Tests API', () => {
    test('workflow complet', async () => {
        
        const tokenRes = await request(app)
            .post('/api/token')
            .send({ email: 'test@example.com' });
        expect(tokenRes.status).toBe(200);
        
        
        const justifyRes = await request(app)
            .post('/api/justify')
            .set('Authorization', `Bearer ${tokenRes.body.token}`)
            .set('Content-Type', 'text/plain')
            .send('Test de justification');
        expect(justifyRes.status).toBe(200);
    });
});