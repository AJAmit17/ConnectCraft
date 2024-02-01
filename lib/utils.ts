import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FormatLargeNumber(value: number): string {
  const suffixes = ["", "K", "M", "B", "T"];

  let index = 0;
  let formattedValue = value;

  while (formattedValue >= 1000 && index < suffixes.length - 1) {
    formattedValue /= 1000;
    index++;
  }

  return `${formattedValue.toFixed(1)}${suffixes[index]}`;
}

export function formatTimeAgo(timestamp: number): string {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `asked ${days} ${days === 1 ? "day" : "days"} back`;
  } else if (hours > 0) {
    return `asked ${hours} ${hours === 1 ? "hour" : "hours"} back`;
  } else {
    return `asked ${minutes} ${minutes === 1 ? "minute" : "minutes"} back`;
  }
}