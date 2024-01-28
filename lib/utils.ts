import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function FormatLargeNumber(value: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T']; 

  let index = 0;
  let formattedValue = value;

  while (formattedValue >= 1000 && index < suffixes.length - 1) {
    formattedValue /= 1000;
    index++;
  }

  return `${formattedValue.toFixed(1)}${suffixes[index]}`;
}