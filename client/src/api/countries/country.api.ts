import { ICountry } from "../../common/interface/interface";
import axiosInstance from "../axios/axios.instance";

export const getAllCountries = async (): Promise<ICountry[]> => {
  try {
    const response = await axiosInstance.get<ICountry[]>("/countries");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const getCountryById = async (id: string): Promise<ICountry> => {
  try {
    const response = await axiosInstance.get<ICountry>(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country with id ${id}:`, error);
    throw error;
  }
};

export const updateCountry = async (
  id: string,
  updatedCountry: Partial<ICountry>
): Promise<ICountry> => {
  try {
    const response = await axiosInstance.put<ICountry>(
      `/countries/${id}`,
      updatedCountry
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating country with id ${id}:`, error);
    throw error;
  }
};
