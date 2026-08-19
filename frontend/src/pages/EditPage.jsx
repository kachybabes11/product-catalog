import React, { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, fetchProducts, editProduct, loading } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageURL: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!products || products.length === 0) {
        await fetchProducts();
      }

      const product = useProductStore
        .getState()
        .products.find((product) => product._id === id);

      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          imageURL: product.imageURL,
        });
      }
    };

    loadProduct();
  }, [id, products, fetchProducts]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await editProduct(id, formData);
    const { success, message } = result;

    if (!success) {
      toaster.create({
        title: "Error editing product",
        description: message || "Try again later.",
        type: "error",
        duration: 6000,
        closable: true,
      });
    } else {
      toaster.create({
        title: "Product updated successfully",
        description: message,
        type: "success",
        duration: 3000,
      });
    }

    console.log("Success:", success);
    console.log("Message:", message);

    if (result.success) {
      navigate(`/products`);
    }
  };

  if (loading) {
    return (
      <Container py={20}>
        <VStack gap={4}>
          <Spinner size="xl" />
          <Text>Loading product...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="600px" py={10}>
      <VStack as="form" onSubmit={handleSubmit} gap={5} align="stretch">
        <Heading>Edit Product</Heading>

        <Input
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <Input
          name="imageURL"
          placeholder="Image URL"
          value={formData.imageURL}
          onChange={handleChange}
        />

        <Button type="submit" colorPalette="cyan" loading={loading}>
          Save Changes
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/products")}
        >
          Cancel
        </Button>
      </VStack>
    </Container>
  );
};

export default EditPage;
