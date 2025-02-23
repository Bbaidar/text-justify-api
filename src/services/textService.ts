
export const countWordsInText = (text: string): number => {
    return text.split(' ').length;
  };
  
export const justifyText = (text: string, lineLength: number): string => {
    const words = text.split(' ');
    let lines: string[] = [];
    let currentLine = '';
  
    words.forEach((word) => {
      if (currentLine.length + word.length + 1 <= lineLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
  
    return lines.join('\n');
  
  
  };
  