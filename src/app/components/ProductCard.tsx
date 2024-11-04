"use client";

import Link from "next/link";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../data/product";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <Link href={`/products/${product.id}`} passHref>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
            {isFavorite && (
              <span style={{ marginLeft: "8px", color: "red" }}>❤️</span>
            )}{" "}
            {/* Heart icon for favorites */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
