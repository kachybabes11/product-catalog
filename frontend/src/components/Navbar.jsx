import React from "react";
import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { IoMoon, IoAdd } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        minH={16}
        alignItems="center"
        justifyContent="space-between"
        gap={4}
      >
        <Text
          fontSize={{ base: "18px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
          whiteSpace="nowrap"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack gap={2} alignItems="center">
          <Link to="/create">
            <Button>
              <IoAdd size={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
