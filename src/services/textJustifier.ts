// Définition de l'interface en haut du fichier
interface JustifyOptions {
    maxLength: number;
    preserveNewlines?: boolean;
}

export class TextJustifier {
    private static readonly DEFAULT_MAX_LENGTH = 80;
    private readonly options: JustifyOptions;

    constructor(options?: Partial<JustifyOptions>) {
        this.options = {
            maxLength: options?.maxLength ?? TextJustifier.DEFAULT_MAX_LENGTH,
            preserveNewlines: options?.preserveNewlines ?? false
        };
    }

    validate(text: string): void {
        if (typeof text !== 'string') {
            throw new Error('Le texte doit être une chaîne de caractères');
        }
    }

    justify(text: string): string {
        this.validate(text);
        if (!text) return '';

        const words = text.split(/\s+/).filter(word => word.length > 0);
        const lines: string[] = [];
        let currentLine: string[] = [];
        let currentLength = 0;

        for (const word of words) {
            if (currentLength + word.length + currentLine.length <= this.options.maxLength) {
                currentLine.push(word);
                currentLength += word.length;
            } else {
                if (currentLine.length > 0) {
                    lines.push(this.justifyLine(currentLine, this.options.maxLength));
                }
                currentLine = [word];
                currentLength = word.length;
            }
        }

        if (currentLine.length > 0) {
            lines.push(currentLine.join(' '));
        }

        return lines.join('\n');
    }

    private justifyLine(words: string[], maxLength: number): string {
        if (words.length === 1) return words[0];
        
        const textLength = words.reduce((sum, word) => sum + word.length, 0);
        const spacesNeeded = maxLength - textLength;
        const gaps = words.length - 1;
        const spacesPerGap = Math.floor(spacesNeeded / gaps);
        let extraSpaces = spacesNeeded % gaps;

        return words.reduce((line, word, i) => {
            if (i === words.length - 1) return line + word;
            const spaces = spacesPerGap + (extraSpaces-- > 0 ? 1 : 0);
            return line + word + ' '.repeat(spaces);
        }, '');
    }
}
  