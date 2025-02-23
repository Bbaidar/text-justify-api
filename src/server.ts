import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import textRoutes from './routes/textRoutes';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;


app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'text/plain' }));


app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

app.use('/api', authRoutes);
app.use('/api', textRoutes);

if (require.main === module) {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
}

export default app;  