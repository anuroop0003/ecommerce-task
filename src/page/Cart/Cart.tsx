import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  updateItemQuantity,
} from "../../redux/slice/CartSlice";
import { RootState } from "../../redux/store";
import CartActions from "./CartActions";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleBack = () => {
    navigate("/products", { replace: true });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <EmptyCart onGoBack={handleBack} />
      ) : (
        <>
          <Grid container spacing={4}>
            {cartItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                <CartItem
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  quantity={item.quantity}
                  thumbnail={item.thumbnail}
                  onRemove={() => handleRemoveItem(item.id)}
                  onIncreaseQuantity={() =>
                    handleIncreaseQuantity(item.id, item.quantity)
                  }
                  onDecreaseQuantity={() =>
                    handleDecreaseQuantity(item.id, item.quantity)
                  }
                />
              </Grid>
            ))}
          </Grid>
          <CartSummary />
          <CartActions onClearCart={handleClearCart} />
        </>
      )}
    </Box>
  );
};

export default Cart;
