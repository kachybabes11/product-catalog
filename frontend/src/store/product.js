import {create} from "zustand"

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.imageURL || !newProduct.price) {
      return { success: false, message: "Please fill all the fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Products added successfully" };
  },
  fetchProducts: async () => {
    set({ loading: true });

    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      set({
        products: data.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
  fetchSingleProduct: async (id) => {
    set({ loading: true });

    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      set({
        products: data.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
  editProduct: async (id, updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.imageURL ||
      !updatedProduct.price
    ) {
      return {
        success: false,
        message: "Please fill all the fields.",
      };
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product,
      ),
    }));

    return {
      success: true,
      message: "Product updated successfully",
    };
  },
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message,
        };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));

      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}));

