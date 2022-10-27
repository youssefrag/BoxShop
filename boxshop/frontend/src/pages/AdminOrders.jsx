import { useState, useEffect } from "react";

import { Button, Container, Typography, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

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

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    let response = await fetch(`base/admin/all-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    setOrders(result);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const changeOrderStatus = async (type, orderId, status) => {
    let otherType = "";
    let otherStatus = false;
    if (type === "isDelivered") {
      otherType = "isPaid";
    } else if (type === "isPaid") {
      otherType = "isDelivered";
    }

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === orderId) {
        otherStatus = orders[i][otherType];
      }
    }
    let body = {
      type: type,
      orderId: orderId,
      status: status,
      otherType: otherType,
      otherStatus: otherStatus,
    };

    let response = await fetch(`base/admin/order-status`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    if (result.detail === "Updated successfully!") {
      window.location.reload();
    }
  };

  const handleDeleteOrder = async (orderId) => {
    console.log(orderId);
    let response = await fetch(`base/admin/delete-order/${orderId}`, {
      method: "POST",
    });
    let result = await response.json();
    if (result.detail === "Deleted successfully!") {
      window.location.reload();
    }
  };

  const getColumns = () => {
    return [
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
      },
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
        minWidth: 250,
        renderCell: (cellValues) => {
          if (cellValues.row.paid) {
            return (
              <Stack alignItems="center">
                <CheckCircleIcon color="primary" />
                <StyledButton
                  variant="contained"
                  onClick={() =>
                    changeOrderStatus(
                      "isPaid",
                      cellValues.id,
                      cellValues.row.paid
                    )
                  }
                >
                  Mark as NOT paid
                </StyledButton>
              </Stack>
            );
          } else {
            return (
              <Stack alignItems="center">
                <CloseRoundedIcon sx={{ color: "red" }} />
                <StyledButton
                  variant="contained"
                  onClick={() =>
                    changeOrderStatus(
                      "isPaid",
                      cellValues.id,
                      cellValues.row.paid
                    )
                  }
                >
                  Mark as paid
                </StyledButton>
              </Stack>
            );
          }
        },
      },
      {
        field: "delivered",
        headerName: "Delivered",
        minWidth: 250,
        renderCell: (cellValues) => {
          if (cellValues.row.delivered) {
            return (
              <Stack alignItems="center">
                <CheckCircleIcon color="primary" />
                <StyledButton
                  variant="contained"
                  onClick={() =>
                    changeOrderStatus(
                      "isDelivered",
                      cellValues.id,
                      cellValues.row.delivered
                    )
                  }
                >
                  Mark as NOT delivered
                </StyledButton>
              </Stack>
            );
          } else {
            return (
              <Stack alignItems="center">
                <CloseRoundedIcon sx={{ color: "red" }} />
                <StyledButton
                  variant="contained"
                  onClick={() =>
                    changeOrderStatus(
                      "isDelivered",
                      cellValues.id,
                      cellValues.row.delivered
                    )
                  }
                >
                  Mark as delivered
                </StyledButton>
              </Stack>
            );
          }
        },
      },

      {
        field: "delete",
        headerName: "Delete",
        minWidth: 100,
        renderCell: (cellValues) => {
          return (
            <Stack alignItems="center">
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleDeleteOrder(cellValues.id)}
              />
              ;
            </Stack>
          );
        },
      },
    ];
  };
  const gridRowsArray = [];

  for (let i = 0; i < orders.length; i++) {
    let orderObject = {};

    orderObject.name = orders[i].profile.name;
    orderObject.id = orders[i].id;
    orderObject.date = orders[i].createdAt.slice(0, 10);
    orderObject.total = orders[i].totalPrice + "$";
    orderObject.paid = orders[i].isPaid;
    orderObject.delivered = orders[i].isDelivered;

    gridRowsArray.push(orderObject);
  }

  return (
    <Container>
      <Typography variant="h3" marginTop={5} marginBottom={6}>
        Admin Order Panel
      </Typography>
      <DataGrid
        rows={gridRowsArray}
        columns={getColumns()}
        headerHeight={60}
        rowHeight={120}
        pageSize={5}
        sx={datagridSx}
      ></DataGrid>
    </Container>
  );
};
