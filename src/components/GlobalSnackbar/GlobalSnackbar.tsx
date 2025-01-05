import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../../redux/slice/SnackbarSlice";
import { RootState } from "../../redux/store";

export default function GlobalSnackbar() {
  const dispatch = useDispatch();

  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={(_event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        handleClose();
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
