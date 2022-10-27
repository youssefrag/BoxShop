import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

import { Box, Container, Typography } from "@mui/material";

import { ProductCard } from "../components/ProductCard";
import { EmptySearch } from "../components/messages/EmptySearch";

import { styled } from "@mui/material/styles";

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  rowGap: theme.spacing(10),
}));

export const Products = () => {
  const [products, setProducts] = useState([]);

  const [emptySearch, setEmptySearch] = useState(false);

  const { searchQuery } = useContext(UserContext);

  const getAllProducts = async () => {
    let response = await fetch("base/products/all");
    let data = await response.json();
    setProducts(data);
  };

  const searchForProducts = async (query) => {
    let response = await fetch(`base/products/${query}`);
    let data = await response.json();
    if (data.length === 0) {
      setEmptySearch(true);
    } else {
      setEmptySearch(false);
    }
    setProducts(data);
  };

  useEffect(() => {
    if (!searchQuery) {
      getAllProducts();
    } else {
      searchForProducts(searchQuery);
    }
  }, [searchQuery]);

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
      {searchQuery === "" ? (
        <Typography variant="h3" marginTop={5} marginBottom={7}>
          Latest Products
        </Typography>
      ) : (
        <Typography variant="h3" marginTop={5} marginBottom={7}>
          Search Results
          <Box marginTop={6}>{emptySearch ? <EmptySearch /> : <></>}</Box>
        </Typography>
      )}
      <GridBox>{renderProdcuts}</GridBox>
    </Container>
  );
};
