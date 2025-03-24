import React from "react";
import { TextField, Typography, Box } from "@mui/material";

interface InputFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  maxLength?: number;
  type?: string;
  multiline?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  setValue,
  required = false,
  maxLength = 255,
  type = "text",
  multiline = false,
}) => {
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setValue(inputValue);
    }

    // Validation
    if (required && inputValue.trim() === "") {
      setError(true);
      setErrorMessage(`${label} is required`);
    } else if (type === "email" && inputValue && !/\S+@\S+\.\S+/.test(inputValue)) {
      setError(true);
      setErrorMessage("Enter a valid email");
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

  return (
    <Box>
      <Typography variant="body1">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <TextField
        value={value}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        multiline={multiline}
        minRows={multiline ? 3 : 1}
        type={type}
        error={error}
        helperText={errorMessage}
      />
    </Box>
  );
};

export default InputField;
