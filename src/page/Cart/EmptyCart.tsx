import { RemoveShoppingCart } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";

interface EmptyCartProps {
  onGoBack: () => void;
}

const EmptyCart = ({ onGoBack }: EmptyCartProps) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    textAlign="center"
  >
    <RemoveShoppingCart sx={{ fontSize: 60, color: "grey", mb: 2 }} />
    <Typography variant="h6" color="text.secondary" mt={2}>
      Your cart is empty. Please add some items to the cart!
    </Typography>
    <Box mt={2}>
      <CustomButton
        label="Go Back"
        color="primary"
        onClick={onGoBack}
        sx={{ width: 200 }}
      />
    </Box>
  </Box>
);

export default EmptyCart;
