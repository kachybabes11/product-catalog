import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProductsPage from './pages/ProductPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import { Toaster } from "@/components/ui/toaster";
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <>
      <Toaster />

      <Box
        minH="100vh"
        bgGradient="to-b"
        gradientFrom="gray.100"
        gradientTo="gray.200"
        _dark={{
          gradientFrom: "gray.800",
          gradientTo: "gray.900",
        }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/edit/:id" element={<EditPage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
