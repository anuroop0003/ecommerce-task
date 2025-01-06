import {
  AttachMoney,
  DeliveryDining,
  LocalMall,
  ShoppingCart,
} from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CartSummary = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const vatPercentage = 10;
  const serviceCharge = 10.0;
  const deliveryCharge = 5.0;

  const vatAmount = (totalPrice * vatPercentage) / 100;
  const grandTotal = totalPrice + vatAmount + serviceCharge + deliveryCharge;

  const charges = [
    {
      label: "Total Items",
      value: itemCount,
      icon: <ShoppingCart sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      label: "Total Price",
      value: totalPrice.toFixed(2),
      icon: <LocalMall sx={{ fontSize: 40, color: "#388e3c" }} />,
    },
    {
      label: `VAT/GST (${vatPercentage}%)`,
      value: vatAmount.toFixed(2),
      icon: <AttachMoney sx={{ fontSize: 40, color: "#fbc02d" }} />,
    },
    {
      label: "Service Charge",
      value: serviceCharge.toFixed(2),
      icon: <AttachMoney sx={{ fontSize: 40, color: "#8e24aa" }} />,
    },
    {
      label: "Delivery Charge",
      value: deliveryCharge.toFixed(2),
      icon: <DeliveryDining sx={{ fontSize: 40, color: "#ffa000" }} />,
    },
    {
      label: "Grand Total",
      value: grandTotal.toFixed(2),
      icon: <AttachMoney sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
  ];

  return (
    <Box mt={4} px={2} py={3}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
      >
        Cart Summary
      </Typography>

      {charges.map((charge, index) => (
        <Box key={index} mb={2}>
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              borderRadius: 2,
              backgroundColor: "#fff",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box display="flex" alignItems="center">
              {charge.icon}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {charge.label}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: charge.label === "Grand Total" ? "#1976d2" : "",
              }}
            >
              ${charge.value}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default CartSummary;
