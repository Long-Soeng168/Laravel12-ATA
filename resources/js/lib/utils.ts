import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toSlug(input: string): string {
    if (!input) return '';

    return input
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[~!@#$%^&*()_+]/g, '')
        .replace(/-+/g, '-')
        .toUpperCase();
}
