import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

import { MissingField } from "../components/messages/MissingField";

import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    background: theme.palette.primary.light,
  },
  "& .MuiInputBase-input": {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  rowGap: theme.spacing(3),
  columnGap: theme.spacing(5),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  gridColumn: "1 / span 2",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  color: theme.palette.primary,
  fontSize: "2rem",
  backgroundColor: theme.palette.primary.dark,
  color: "#fff",
  borderRadius: "9px",
  "&:hover": {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.light,
  },
}));

export const AdminNewProduct = () => {
  let navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    image: null,
    description: "",
    price: null,
    countInStock: 0,
  });

  const [missingField, setMissingField] = useState(false);

  const handleProductChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct((prev) => ({ ...product, [name]: value }));
  };

  const handlePictureUpload = (e) => {
    setProduct((prev) => ({ ...product, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    if (
      !product.name ||
      !product.image ||
      !product.brand ||
      !product.price ||
      !product.countInStock
    ) {
      setMissingField(true);
    }
    const productData = new FormData();
    productData.append("name", product.name);
    productData.append("brand", product.brand);
    productData.append("description", product.description);
    productData.append("price", product.price);
    productData.append("countInStock", product.countInStock);
    if (product.image) {
      productData.append("image", product.image, product.image.name);
    }

    let response = fetch("base/admin/new-product", {
      method: "POST",
      body: productData,
    });
    navigate("/admin/products");
  };

  return (
    <Container size="xl">
      <Typography marginTop={8} marginBottom={4} variant="h3">
        ADD NEW PRODUCT
      </Typography>
      {missingField ? <MissingField /> : <></>}
      <GridBox marginTop={6}>
        <StyledTextField
          type="text"
          placeholder="Enter Product Name"
          name="name"
          label="Name"
          value={product.name || ""}
          onChange={handleProductChange}
        />
        <StyledTextField
          type="text"
          placeholder="Enter Product Brand"
          name="brand"
          label="Brand"
          value={product.brand || ""}
          onChange={handleProductChange}
        />
        <Box sx={{ alignSelf: "center", justifySelf: "center" }}>
          <label
            style={{
              fontSize: "2rem",
              fontFamily: "Rubik, sans-serif",
            }}
          >
            Product Image
            <input type="file" name="image" onChange={handlePictureUpload} />
          </label>
        </Box>
        <StyledTextField
          type="text"
          placeholder="Enter Description"
          name="description"
          label="Description"
          value={product.description || ""}
          multiline
          minRows={3}
          maxRows={6}
          onChange={handleProductChange}
        />
        <StyledTextField
          type="number"
          placeholder="Enter Price in $"
          name="price"
          label="Price"
          value={product.price || ""}
          onChange={handleProductChange}
        />
        <StyledTextField
          type="number"
          placeholder="How many products in stock"
          name="countInStock"
          label="Count in stock"
          value={product.countInStock || ""}
          onChange={handleProductChange}
        />
        <StyledButton onClick={handleSubmit}>Submit product</StyledButton>
      </GridBox>
    </Container>
  );
};
