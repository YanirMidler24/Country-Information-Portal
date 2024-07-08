import { useEffect, useState } from "react";
import { ICountry, IEditableFields } from "../common/interface/interface";

const useEditableCountryFields = (
  initialCountry: ICountry,
  onSave: (updatedCountry: Partial<ICountry>) => void
) => {
  const [editableFields, setEditableFields] = useState<IEditableFields>({
    capital: initialCountry.capital,
    population: initialCountry.population,
  });

  useEffect(() => {
    setEditableFields({
      capital: initialCountry.capital,
      population: initialCountry.population,
    });
  }, [initialCountry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      _id: initialCountry._id,
      ...editableFields,
    });
  };

  return { editableFields, handleChange, handleSave };
};

export default useEditableCountryFields;
