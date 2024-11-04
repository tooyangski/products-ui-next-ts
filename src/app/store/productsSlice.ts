import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  favoriteIds: number[];
  productDetail: Product | null; // New state for product detail
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  favoriteIds: [],
  productDetail: null, // Initialize productDetail state
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:8000/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (id) => {
    const response = await fetch(`http://localhost:8000/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.productDetail = action.payload; // Store the fetched product detail
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      });
  },
});

export const { addFavorite, removeFavorite } = productsSlice.actions;
export default productsSlice.reducer;
