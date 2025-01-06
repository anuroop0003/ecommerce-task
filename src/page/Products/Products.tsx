import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import { addToCart } from "../../redux/slice/CartSlice";
import {
  addProducts,
  incrementPage,
  setProducts,
} from "../../redux/slice/ProductSlice";
import { RootState } from "../../redux/store";
import { useProduct } from "../../services/Queries/Product/Product";

export default function Products() {
  const dispatch = useDispatch();
  const { page, products } = useSelector((state: RootState) => state.product);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching } = useProduct({
    method: "LIST_PRODUCTS",
    data: {
      page,
      limit: 12,
    },
  });

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          handleLoadMore();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef?.current);
    }

    return () => {
      if (observerRef.current) {
        observer.disconnect();
      }
    };
  }, [page, isFetching]);

  useEffect(() => {
    if (data) {
      if (page === 0) {
        dispatch(setProducts(data.products));
      } else {
        dispatch(addProducts(data.products));
      }
    }
  }, [data, dispatch, page]);

  const handleAddToCart = (product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  }) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" mt={1}>
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {product.stock}
                </Typography>
                <CustomButton
                  label="Add to Cart"
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCart(product)}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      <div ref={observerRef} style={{ height: 1 }} />
    </Box>
  );
}
