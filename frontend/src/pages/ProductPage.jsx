import React, { useEffect } from "react";
import {
  Container,
  VStack,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useProductStore } from "@/store/product";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const { fetchProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <Container maxW="1100px" py={20}>
        <VStack gap={4}>
          <Spinner size="xl" color="cyan.500" />
          <Text color="gray.500">Loading products...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="1100px" py={{ base: 6, md: 10 }} px={4}>
      <VStack gap={8} align="stretch">
        <Heading size="2xl">Your Products</Heading>

        {!products || products.length === 0 ? (
          <Text color="gray.500">No products available.</Text>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap={6}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default ProductsPage;
