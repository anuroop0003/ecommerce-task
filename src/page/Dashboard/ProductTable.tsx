import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useProduct } from "../../services/Queries/Product/Product";
import { BaseProductType } from "../../services/Queries/Product/type";
import AddProductDialog from "./AddProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import EditProductDialog from "./EditProductDialog";

export default function ProductTable() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    Partial<BaseProductType>
  >({});

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const { data, isLoading, isFetching } = useProduct({
    method: "LIST_PRODUCTS",
    data: {
      page: paginationModel.page,
      limit: paginationModel.pageSize,
    },
  });

  const rows = data?.products.map((product) => ({
    id: product.id ?? "N/A",
    title: product.title ?? "N/A",
    price: product.price ?? "N/A",
    stock: product.stock ?? "N/A",
    category: product.category ?? "N/A",
    brand: product.brand ?? "N/A",
    status: product?.availabilityStatus ?? "N/A",
  }));

  function handleEdit(product: BaseProductType) {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  }

  function handleDelete(product: BaseProductType) {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Product Name", width: 250 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "category", headerName: "Category", width: 180 },
    { field: "brand", headerName: "Brand", width: 180 },
    { field: "status", headerName: "Status", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box
          marginY={1.5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <CustomButton
            sx={{ p: "0px 10px" }}
            onClick={() => handleEdit(params.row)}
            label="Edit"
          />
          <CustomButton
            sx={{ p: "0px 10px" }}
            onClick={() => handleDelete(params.row)}
            label="Delete"
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box
          marginY={2.5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Product Inventory</Typography>
          <CustomButton
            sx={{ width: 200 }}
            label="Add Product"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpenAddDialog(true)}
          />
        </Box>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            loading={isFetching || isLoading}
            rows={rows || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
            rowCount={data?.total || 0}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            paginationModel={paginationModel}
            pageSizeOptions={[5, 10, 20]}
            hideFooterPagination={isLoading || isFetching}
          />
        </Box>
      </Paper>
      <AddProductDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
      <EditProductDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        product={selectedProduct}
      />
      <DeleteProductDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        productId={selectedProduct?.id}
        productName={selectedProduct?.title}
      />
    </>
  );
}
