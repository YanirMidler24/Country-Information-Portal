export const validateInput = (name: string, value: string | number) => {
  let error = "";
  let valid = true;

  // Check if value is empty
  if (value === "" || value === null || value === undefined) {
    error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    valid = false;
  } else {
    if (typeof value === "string" && name === "capital") {
      if (/\d/.test(value)) {
        error = "Capital cannot contain numbers.";
        valid = false;
      }
    }

    if (name === "population") {
      if (typeof value === "string" && !/^\d+$/.test(value)) {
        error = "Population can only contain numbers.";
        valid = false;
      }
      if (typeof value === "number" && isNaN(value)) {
        error = "Population must be a valid number.";
        valid = false;
      }
    }
  }

  return { error, valid };
};
