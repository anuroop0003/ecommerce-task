import { Box } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";

interface CartActionsProps {
  onClearCart: () => void;
}

const CartActions = ({ onClearCart }: CartActionsProps) => (
  <Box
    mt={4}
    display="flex"
    justifyContent="center"
    flexDirection="column"
    alignItems="center"
  >
    <CustomButton
      label="Clear Cart"
      sx={{ width: 200, mb: 2 }}
      onClick={onClearCart}
    />
    <CustomButton label="Checkout" sx={{ width: 200 }} />
  </Box>
);

export default CartActions;
