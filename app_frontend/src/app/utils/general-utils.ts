// Utility helper file that contains general functions.
// currently holds one for regex validation.
// The theory is that this will hold more functions and provides a space to edit them when required.

export function formatEnumValue(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2');
}