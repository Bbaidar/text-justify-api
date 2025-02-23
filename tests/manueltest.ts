import { TextJustifier } from '../src/services/textJustifier';

const testJustification = () => {
    const justifier = new TextJustifier();
    
    const texteTest = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

    console.log('=== Test de justification ===');
    console.log('\nTexte original :');
    console.log(texteTest);
    console.log('\nTexte justifié :');
    console.log(justifier.justify(texteTest));
    console.log('\n=== Fin du test ===');
};

testJustification();