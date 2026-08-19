import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Container,
  Heading,
  VStack,
  Box,
  Input,
  Button,
  Field,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageURL: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toaster.create({
        title: "Error adding product",
        description: message || "Try again later.",
        type: "error",
        duration: 5000,
        closable: true,
      });
    } else {
      toaster.create({
        title: "Product added successfully",
        description: message,
        type: "success",
        duration: 5000,
      });

      setNewProduct({
        name: "",
        price: "",
        imageURL: "",
      });
    }

    console.log("Success:", success);
    console.log("Message:", message);
  };

  return (
    <Container maxW="container.sm" px={4} py={8}>
      <VStack gap={4}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8} fontWeight="bold">
          Create New Product
        </Heading>

        <Box
          w="500px"
          maxW="100%"
          bg={useColorModeValue("gray.100", "gray.700")}
          p={6}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
        >
          <VStack gap={4}>
            <Field.Root
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              <Field.Label whiteSpace="nowrap">Product name:</Field.Label>

              <Input
                flex={1}
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />
            </Field.Root>

            <Field.Root
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              <Field.Label whiteSpace="nowrap">Product price:</Field.Label>

              <Input
                flex={1}
                type="number"
                name="price"
                placeholder="Product Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />
            </Field.Root>

            <Field.Root
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              <Field.Label whiteSpace="nowrap">Product image:</Field.Label>

              <Input
                flex={1}
                type="text"
                name="imageURL"
                placeholder="Product Image URL"
                value={newProduct.imageURL}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    imageURL: e.target.value,
                  })
                }
              />
            </Field.Root>

            <Button mt={4} bg="cyan.500" onClick={handleAddProduct}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
