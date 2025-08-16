import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const allCountries = async () => {
  try {
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    // console.log("All countries", res.data);
    return res.data
      .map((country) => country?.name?.common)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    throw error;
  }
};

const useCountry = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: allCountries,
  });
};

export default useCountry;
