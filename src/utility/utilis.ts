export function buildClassName(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(" ").trim();
}