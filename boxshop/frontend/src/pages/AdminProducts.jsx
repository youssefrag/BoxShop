import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Button, Container, Typography } from "@mui/material";

import { ProductCard } from "../components/ProductCard";

import { styled } from "@mui/material/styles";

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  rowGap: theme.spacing(10),
}));

const NewProductBtn = styled(Button)(({ theme }) => ({
  fontSize: "3.4rem",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
}));

export const AdminProducts = () => {
  let navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    let response = await fetch("base/products/all");
    let data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  let renderProdcuts = [];

  renderProdcuts = products.map((product) => {
    const imageLink = product.image;

    return (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        imageLink={imageLink}
        rating={product.rating}
        numReviews={product.numReviews}
        price={product.price}
        brand={product.brand}
      />
    );
  });

  return (
    <Container size="xl">
      <Typography variant="h3" marginTop={6}>
        ADMIN PRODUCT PANEL
      </Typography>
      <GridBox marginTop={6}>
        {renderProdcuts}
        <NewProductBtn onClick={() => navigate("/admin/new-product")}>
          Add new product
        </NewProductBtn>
      </GridBox>
    </Container>
  );
};
