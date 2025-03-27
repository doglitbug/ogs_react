export function shortenText(text: string): string {
    const maxLength = 150;
    if (text.length > maxLength) {
        text = text.substring(0, maxLength) + "..."
    }
    return text;
}