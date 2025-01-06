import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type Props = TextFieldProps & {
  errormessage: string | null | undefined;
};

const CustomInput = forwardRef((props: Props, ref) => {
  return (
    <TextField
      {...props}
      helperText={props.errormessage}
      variant="outlined"
      inputRef={ref}
    />
  );
});

export default CustomInput;
