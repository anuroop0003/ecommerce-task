import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  onRemove: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

const CartItem = ({
  title,
  price,
  quantity,
  thumbnail,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartItemProps) => {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
      <CardMedia
        component="img"
        height="200"
        image={thumbnail}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${price}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Box display="flex" alignItems="center">
            <IconButton color="primary" onClick={onDecreaseQuantity}>
              <Remove />
            </IconButton>
            <TextField
              value={quantity}
              slotProps={{
                input: {
                  style: {
                    textAlign: "center",
                    width: "60px",
                  },
                  readOnly: true,
                },
              }}
              variant="outlined"
              size="small"
              sx={{ mx: 1 }}
            />
            <IconButton color="primary" onClick={onIncreaseQuantity}>
              <Add />
            </IconButton>
          </Box>
          <CustomButton sx={{ width: 100 }} label="Remove" onClick={onRemove} />
        </Box>

        <Typography variant="body2" color="text.secondary" mt={2}>
          Total: ${price * quantity}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartItem;
