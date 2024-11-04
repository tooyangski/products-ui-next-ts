"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import {
  addFavorite,
  removeFavorite,
  fetchProductById,
} from "../store/productsSlice";
import { useRouter } from "next/router";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import Image from "next/image";

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch: AppDispatch = useDispatch();
  const { productDetail, loading, error, favoriteIds } = useSelector(
    (state: RootState) => state.products
  );

  const isFavorite = favoriteIds.includes(Number(id));

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(Number(id)));
    } else {
      dispatch(addFavorite(Number(id)));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!productDetail) return <Typography>No product found.</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {productDetail.name}
      </Typography>
      <Image
        src={productDetail.image}
        alt={productDetail.name}
        width={300}
        height={300}
      />
      <Typography variant="body1" paragraph>
        {productDetail.description}
      </Typography>
      <Typography variant="h6">
        Price: ${productDetail.price.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color={isFavorite ? "error" : "primary"}
        onClick={toggleFavorite}
        sx={{ marginTop: 2 }}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </Box>
  );
};

export default ProductDetail;
