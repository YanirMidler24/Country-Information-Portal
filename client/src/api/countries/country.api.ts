import { Country } from "../../common/interface/interface";
import axiosInstance from "../axios/axios.instance";

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axiosInstance.get<Country[]>("/countries");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const getCountryById = async (id: string): Promise<Country> => {
  try {
    const response = await axiosInstance.get<Country>(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country with id ${id}:`, error);
    throw error;
  }
};

export const updateCountry = async (
  id: string,
  updatedCountry: Partial<Country>
): Promise<Country> => {
  try {
    const response = await axiosInstance.put<Country>(
      `/countries/${id}`,
      updatedCountry
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating country with id ${id}:`, error);
    throw error;
  }
};
