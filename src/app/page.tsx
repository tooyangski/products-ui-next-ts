"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks";
import { ProductCard } from "./components/ProductCard";
import { fetchProducts } from "./store/productsSlice";
import { Product } from "./data/product";

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, loading, error, favoriteIds } = useAppSelector(
    (state) => state.products
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Product List
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        label="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 4 }}
      />
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {filteredProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteIds.includes(product.id)}
          />
        ))}
      </Box>
    </Container>
  );
}
