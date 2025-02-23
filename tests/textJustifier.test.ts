import { TextJustifier } from '../src/services/textJustifier';

describe('TextJustifier Tests', () => {
    let justifier: TextJustifier;

    beforeEach(() => {
        justifier = new TextJustifier();
    });

    describe('Tests basiques', () => {
        test('devrait retourner une chaîne vide pour une entrée vide', () => {
            const resultat = justifier.justify('');
            expect(resultat).toBe('');
        });

        test('devrait justifier une ligne simple', () => {
            const texte = 'Un texte simple à justifier';
            const resultat = justifier.justify(texte);
            const lignes = resultat.split('\n');
            expect(lignes[0].length).toBeLessThanOrEqual(80);
        });
    });

    describe('Tests avancés', () => {
        test('devrait respecter la limite de 80 caractères', () => {
            const texte = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.';
            const resultat = justifier.justify(texte);
            const lignes = resultat.split('\n');
            lignes.forEach(ligne => {
                expect(ligne.length).toBeLessThanOrEqual(80);
            });
        });

        test('devrait distribuer les espaces uniformément', () => {
            const texte = 'Un texte qui doit être parfaitement justifié avec plusieurs mots';
            const resultat = justifier.justify(texte);
            const lignes = resultat.split('\n');
            const espaces = lignes[0].match(/\s+/g);
            
            if (espaces && espaces.length > 1) {
                const longueurs = espaces.map(e => e.length);
                const difference = Math.max(...longueurs) - Math.min(...longueurs);
                expect(difference).toBeLessThanOrEqual(1);
            }
        });
    });
});