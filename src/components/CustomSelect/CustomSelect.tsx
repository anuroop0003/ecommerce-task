import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { forwardRef } from "react";

type Props = SelectProps & {
  label: string;
  options: { value: string | number; label: string }[];
  errormessage?: string | null;
};

const CustomSelect = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, errormessage, ...props }, ref) => {
    return (
      <FormControl fullWidth variant="outlined" error={!!errormessage}>
        <InputLabel>{label}</InputLabel>
        <Select {...props} inputRef={ref} label={label}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errormessage && <FormHelperText>{errormessage}</FormHelperText>}
      </FormControl>
    );
  }
);

export default CustomSelect;
