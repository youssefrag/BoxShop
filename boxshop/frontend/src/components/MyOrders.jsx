import { useEffect } from "react";
import { Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";

import { DataGrid } from "@mui/x-data-grid";

import { styled } from "@mui/material/styles";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  color: theme.palette.primary,
  fontSize: "0.8rem",
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.primary.light,
  borderRadius: "9px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  },
}));

const datagridSx = {
  height: "36rem",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "primary.light2",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    fontSize: 12,
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-of-type(2n)": {
        backgroundColor: "primary.light",
      },
    },
  },
  "& .MuiDataGrid-cellContent": {
    fontSize: 16,
    fontWeight: 700,
  },
  "& .MuiTablePagination-displayedRows": {
    fontSize: "1.2rem ",
  },
};

export const MyOrders = () => {
  let navigate = useNavigate();

  const { userContextEmail } = useContext(UserContext);

  const [myOrders, setMyOrders] = useState([]);

  const getMyOrders = async () => {
    let response = await fetch(`base/get-orders/${userContextEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    setMyOrders(result);
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  const getColumns = () => {
    return [
      {
        field: "date",
        headerName: "Date",
        minWidth: 200,
      },
      {
        field: "total",
        headerName: "Total",
        minWidth: 160,
      },
      {
        field: "paid",
        headerName: "Paid",
        minWidth: 140,
        renderCell: (cellValues) => {
          if (cellValues.value === false) {
            return <CloseRoundedIcon sx={{ color: "red" }} />;
          } else if (cellValues.value === true) {
            return <CheckCircleIcon color="primary" />;
          }
        },
      },
      {
        field: "delivered",
        headerName: "Delivered",
        minWidth: 140,
        renderCell: (cellValues) => {
          if (cellValues.value === false) {
            return <CloseRoundedIcon sx={{ color: "red" }} />;
          } else if (cellValues.value === true) {
            return <CheckCircleIcon color="primary" />;
          }
        },
      },

      {
        field: "id",
        headerName: "Details",
        minWidth: 70,
        renderCell: (cellValues) => {
          return (
            <StyledButton
              variant="contained"
              onClick={() => {
                navigate(`/orders/${cellValues.value}`);
              }}
            >
              Details
            </StyledButton>
          );
        },
      },
    ];
  };

  const gridRowsArray = [];

  for (let i = 0; i < myOrders.length; i++) {
    let orderObject = {};

    orderObject.id = myOrders[i].id;
    orderObject.date = myOrders[i].createdAt.slice(0, 10);
    orderObject.total = myOrders[i].totalPrice + "$";
    orderObject.paid = myOrders[i].isPaid;
    orderObject.delivered = myOrders[i].isDelivered;

    gridRowsArray.push(orderObject);
  }

  return (
    <>
      <Typography variant="h4" marginTop={7} marginBottom={5}>
        MY ORDERS
      </Typography>
      <DataGrid
        rows={gridRowsArray}
        columns={getColumns()}
        headerHeight={60}
        rowHeight={120}
        pageSize={5}
        sx={datagridSx}
      ></DataGrid>
    </>
  );
};
