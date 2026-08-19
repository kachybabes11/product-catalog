import React, { useEffect, useState } from "react";
import {
  Container,
  SimpleGrid,
  Image,
  VStack,
  Heading,
  Text,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "@/store/product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const findProduct = async () => {
      if (!products || products.length === 0) {
        await fetchProducts();
      }

      const foundProduct = useProductStore
        .getState()
        .products.find((product) => product._id === id);

      setProduct(foundProduct);
    };

    findProduct();
  }, [id, products, fetchProducts]);

  if (!product) {
    return (
      <Container maxW="1100px" py={20}>
        <VStack gap={4}>
          <Spinner size="xl" color="cyan.500" />
          <Text>Loading product...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="1100px" py={{ base: 6, md: 10 }} px={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="center">
        <Image
          src={product.imageURL}
          alt={product.name}
          w="100%"
          maxH="500px"
          objectFit="cover"
          borderRadius="xl"
        />

        <VStack align="stretch" gap={5}>
          <Heading size="2xl">{product.name}</Heading>

          <Text fontSize="3xl" fontWeight="bold" color="cyan.500">
            ₦{product.price}
          </Text>

          <Text color="gray.500">
            {product.description || "No description available."}
          </Text>

          <Link to="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default ProductDetailsPage;
