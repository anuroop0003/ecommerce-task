import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const CustomInput = forwardRef((props: TextFieldProps, ref) => {
  return <TextField {...props} variant="outlined" inputRef={ref} />;
});

export default CustomInput;
