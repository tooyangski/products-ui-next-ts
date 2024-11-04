"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  addFavorite,
  fetchProductById,
  removeFavorite,
} from "@/app/store/productsSlice";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { productDetail, loading, error, favoriteIds } = useSelector(
    (state: RootState) => state.products
  );

  const productId = Number(params.id); // Extract product ID from params
  const isFavorite = favoriteIds.includes(productId);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(productId));
    } else {
      dispatch(addFavorite(productId));
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

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
      <Button
        variant="outlined"
        onClick={() => router.back()}
        sx={{ marginTop: 2, marginLeft: 2 }}
      >
        Back
      </Button>
    </Box>
  );
};

export default ProductDetail;
