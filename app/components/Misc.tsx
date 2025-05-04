export function shortenText(text: string, noDescription: boolean = true): string {
    const maxLength = 125;
    if (text.length > maxLength) {
        text = text.substring(0, maxLength) + "..."
    }
    if (text == "" && noDescription) text = "No description provided"
    return text;
}