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
import { z } from "zod";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { showSnackbar } from "../../redux/slice/SnackbarSlice";
import { useProduct } from "../../services/Queries/Product/Product";
import { BaseProductType } from "../../services/Queries/Product/type";
import { productSchema } from "../../validation/Product";

type Props = {
  open: boolean;
  onClose: () => void;
  product: Partial<BaseProductType>;
};

type FormSchema = z.infer<typeof productSchema>;

export default function EditProductDialog({ open, onClose, product }: Props) {
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useProduct({ method: "EDIT_PRODUCT" });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(productSchema),
    values: product as BaseProductType,
  });

  console.log("product", product);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: FormSchema) => {
    try {
      await mutateAsync({ ...values, id: product.id });
      dispatch(
        showSnackbar({
          message: "Product updated successfully!",
          severity: "success",
        })
      );
      handleClose();
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message:
            error?.response?.data?.message || "Failed to update the product.",
          severity: "error",
        })
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Edit Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Product Name"
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
                label="Update"
                type="submit"
              />
            </Box>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
