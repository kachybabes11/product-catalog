import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Container,
  VStack,
  HStack,
  Button,
  Text,
  Heading,
  Box,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiPlus, FiPackage, FiZap, FiShield } from "react-icons/fi";

const HomePage = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const mutedText = useColorModeValue("gray.600", "gray.400");

  return (
    <>
      <Container maxW="1100px" py={{ base: 6, md: 10 }} px={4}>
        <VStack gap={8}>
          <Box
            w="100%"
            py={{ base: 10, md: 14 }}
            px={6}
            borderRadius="2xl"
            textAlign="center"
            position="relative"
            overflow="hidden"
            bg={cardBg}
            borderWidth="1px"
            boxShadow="sm"
          >
            <Box
              position="absolute"
              w="250px"
              h="250px"
              borderRadius="full"
              bg="cyan.400"
              opacity="0.08"
              filter="blur(70px)"
              top="-100px"
              left="50%"
              transform="translateX(-50%)"
            />

            <VStack gap={7} position="relative">
              <Box
                className="floating"
                w="70px"
                h="70px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgGradient="to-r"
                gradientFrom="cyan.400"
                gradientTo="blue.500"
                color="white"
                boxShadow="0 8px 30px rgba(34, 211, 238, 0.25)"
              >
                <Icon size="32px">
                  <FiPackage />
                </Icon>
              </Box>

              <Heading fontSize={{ base: "3xl", md: "4xl" }}>
                Manage your{" "}
                <Text
                  as="span"
                  bgGradient="to-r"
                  gradientFrom="cyan.400"
                  gradientTo="blue.500"
                  bgClip="text"
                >
                  products
                </Text>
              </Heading>

              <Text color={mutedText} maxW="600px">
                Easily create, manage and organize all your products in one
                place.
              </Text>

              <HStack gap={4} flexWrap="wrap" justify="center">
                <Link to="/products">
                  <Button size="lg" variant="outline">
                    <FiPackage />
                    View Products
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="100%">
            <FeatureCard
              icon={<FiZap />}
              title="Quick & Easy"
              text="Add products in seconds."
              color="cyan.500"
              bg={cardBg}
              mutedText={mutedText}
            />

            <FeatureCard
              icon={<FiShield />}
              title="Secure"
              text="Your product data stays safe."
              color="blue.500"
              bg={cardBg}
              mutedText={mutedText}
            />

            <FeatureCard
              icon={<FiPackage />}
              title="Build Your Store"
              text="Add products and grow your catalog."
              color="cyan.500"
              bg={cardBg}
              mutedText={mutedText}
            />
          </SimpleGrid>
        </VStack>
      </Container>

      <style>
        {`
          .floating {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-8px);
            }
          }
        `}
      </style>
    </>
  );
};

const FeatureCard = ({ icon, title, text, color, bg, mutedText }) => {
  return (
    <HStack
      p={5}
      gap={4}
      bg={bg}
      borderWidth="1px"
      borderRadius="xl"
      transition="all 0.25s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
      }}
    >
      <Box p={3} borderRadius="lg" bg={color} color="white" flexShrink={0}>
        <Icon size="20px">{icon}</Icon>
      </Box>

      <VStack align="start" gap={0}>
        <Text fontWeight="bold">{title}</Text>

        <Text fontSize="sm" color={mutedText}>
          {text}
        </Text>
      </VStack>
    </HStack>
  );
};

export default HomePage;
