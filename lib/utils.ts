import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toNumber(value: string): number {
  const trimmed = value.trim();
  if (trimmed === '') return 0;
  
  const num = Number(trimmed);
  return isNaN(num) ? 0 : num;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function truncateWithDots(str: string, maxLength: number = 100) {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  
  return str.slice(0, maxLength - 3) + '...';
}