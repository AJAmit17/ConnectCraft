import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

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

export function getJoinedDate(date: Date): string {
  const month: string = date.toLocaleString("default", { month: "long" });
  const year: number = date.getFullYear();

  return `Joined | ${month} ${year}`;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
}

export const formatAndDivideNumber = (number: number): string => {
  if (number >= 1000000) {
    // If the number is in millions (1,000,000 or more)
    const millions = (number / 1000000).toFixed(2);
    return `${millions}M`;
  } else if (number >= 1000) {
    // If the number is in thousands (1,000 or more)
    const thousands = (number / 1000).toFixed(2);
    return `${thousands}K`;
  } else {
    // If the number is less than 1,000, simply return the number as is
    return `${number}`;
  }
};

export function processJobTitle(title: string | undefined | null): string {
  if (title === undefined || title === null) {
    return "No Job Title";
  }

  const words = title.split(" ");

  const validWords = words.filter((word) => {
    return (
      word !== undefined &&
      word !== null &&
      word.toLowerCase() !== "undefined" &&
      word.toLowerCase() !== "null"
    );
  });

  if (validWords.length === 0) {
    return "No Job Title";
  }

  const processedTitle = validWords.join(" ");
  return processedTitle;
}