import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { showSnackbar } from "../../redux/slice/SnackbarSlice";
import { useProduct } from "../../services/Queries/Product/Product";
import { productSchema } from "../../validation/Product";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialState = { title: "", price: 0, stock: 0, category: "", brand: "" };

type FormSchema = z.infer<typeof productSchema>;

export default function AddProductDialog({
  open,
  onClose,
}: AddProductDialogProps) {
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useProduct({ method: "ADD_PRODUCT" });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: initialState,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: FormSchema) => {
    try {
      await mutateAsync(values);
      dispatch(
        showSnackbar({
          message: "Product saved successfully!",
          severity: "success",
        })
      );
      reset();
      handleClose();
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message:
            error?.response?.data?.message ||
            "Failed to save the product. Please try again.",
          severity: "error",
        })
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Product Title"
                fullWidth
                margin="dense"
                error={!!errors.title}
                errormessage={errors.title?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Price"
                fullWidth
                margin="dense"
                type="number"
                error={!!errors.price}
                errormessage={errors.price?.message}
              />
            )}
          />
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Stock"
                fullWidth
                margin="dense"
                type="number"
                error={!!errors.stock}
                errormessage={errors.stock?.message}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Category"
                fullWidth
                margin="dense"
                error={!!errors.category}
                errormessage={errors.category?.message}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Brand"
                fullWidth
                margin="dense"
                error={!!errors.brand}
                errormessage={errors.brand?.message}
              />
            )}
          />
          <DialogActions sx={{ p: 0 }}>
            <Box display="flex" gap={2} marginTop={2.5}>
              <CustomButton
                sx={{ width: 100 }}
                onClick={handleClose}
                label="Cancel"
              />
              <CustomButton
                sx={{ width: 100 }}
                loading={isPending}
                label="Add"
                type="submit"
              />
            </Box>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
