import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import { showSnackbar } from "../../redux/slice/SnackbarSlice";
import { useProduct } from "../../services/Queries/Product/Product";

type Props = {
  open: boolean;
  onClose: () => void;
  productId: number | undefined;
  productName: string | undefined;
};

export default function DeleteProductDialog({
  open,
  onClose,
  productId,
  productName,
}: Props) {
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useProduct({ method: "DELETE_PRODUCT" });

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: productId });
      dispatch(
        showSnackbar({
          message: "Product deleted successfully!",
          severity: "success",
        })
      );
      onClose();
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message:
            error?.response?.data?.message || "Failed to delete the product.",
          severity: "error",
        })
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
        <Typography variant="h6" color="error">
          Confirm Deletion
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
          Are you sure you want to delete the product
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            "{productName}" !
          </Typography>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box display="flex" gap={2}>
          <CustomButton
            sx={{ width: 100 }}
            onClick={onClose}
            label="Cancel"
            variant="outlined"
          />
          <CustomButton
            sx={{ width: 100 }}
            loading={isPending}
            onClick={handleDelete}
            label="Delete"
            variant="contained"
            color="error"
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}
