import { Button, ButtonBaseProps } from "@mui/material";
import button_loader from "../../assets/loader.svg";

type Props = ButtonBaseProps & {
  label: string;
  loading?: boolean;
};

export default function CustomButton({
  label,
  loading = false,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      fullWidth
      size="large"
      variant="outlined"
      color="primary"
      //   sx={{
      //     color: "#000",
      //     borderColor: "#2e2e2e",
      //     "&:hover": {
      //       borderColor: "#1e1e1e",
      //       backgroundColor: "#f5f5f5",
      //     },
      //   }}
    >
      {!loading ? label : <img src={button_loader} alt="Button Loader" />}
    </Button>
  );
}
