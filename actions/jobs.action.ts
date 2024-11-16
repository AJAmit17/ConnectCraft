import { JobFilterParams } from "./shared.types";

export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}&num_pages=1&date_posted=all`,
    options
  );
  if (!response.ok) {
    throw new Error(`Error fetching jobs: ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
};
