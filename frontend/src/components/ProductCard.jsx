import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useProductStore } from "@/store/product";

const ProductCard = ({ product }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const { deleteProduct } = useProductStore();

  const handleDelete = async (productId) => {
    const { success, message } = await deleteProduct(productId);

    if (!success) {
      toaster.create({
        title: "Error deleting product",
        description: message || "Try again later.",
        type: "error",
        duration: 5000,
        closable: true,
      });
    } else {
      toaster.create({
        title: "Product deleted successfully",
        description: message,
        type: "success",
        duration: 5000,
      });
    }

    console.log("Success:", success);
    console.log("Message:", message);
  };

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.25s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "lg",
      }}
    >
      {/* Product image is clickable */}
      <Link to={`/products/${product._id}`}>
        <Image
          src={product.imageURL}
          alt={product.name}
          w="100%"
          h="220px"
          objectFit="cover"
        />
      </Link>

      <VStack align="stretch" p={5} gap={3}>
        {/* Product name is clickable */}
        <Link to={`/products/${product._id}`}>
          <Heading size="md">{product.name}</Heading>
        </Link>

        {/* Price + action buttons */}
        <HStack justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="cyan.500">
            ₦{product.price}
          </Text>

          <HStack gap={2}>
            {/* Edit */}
            <Link to={`/products/edit/${product._id}`}>
              <Button
                size="sm"
                variant="outline"
                colorPalette="blue"
                aria-label="Edit product"
              >
                <FiEdit2 />
              </Button>
            </Link>

            {/* Delete */}
            <Button
              size="sm"
              variant="outline"
              colorPalette="red"
              aria-label="Delete product"
              onClick={() => handleDelete(product._id)}
            >
              <FiTrash2 />
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductCard;
