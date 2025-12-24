// Generic reusable table component 
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Avatar,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";

function DynamicComponent({
  data,
  columns,
  onAdd,
  onUpdate,
  onDelete,
  onShowBuyers,
  hideActions = false
}) {

   // ===== Pagination State =====
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // ===== ADD / EDIT STATE =====
  const [openForm, setOpenForm] = useState(false);   
  const [editingItem, setEditingItem] = useState(null); 
  const [formData, setFormData] = useState({}); 

  // ===== BUYERS DIALOG =====
  const [openBuyers, setOpenBuyers] = useState(false);
  const [buyersData, setBuyersData] = useState([]);

  // ===== Pagination Handlers =====
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // ===== DATE FORMAT =====
  const formatDate = (value) => {
    if (!value) return "-";
    try {
      if (typeof value.toDate === "function") {
        return value.toDate().toLocaleString("he-IL");
      }
      if (value.seconds) {
        return new Date(value.seconds * 1000).toLocaleString("he-IL");
      }
      return new Date(value).toLocaleString("he-IL");
    } catch {
      return "-";
    }
  };

  // ===== CELL RENDER =====
  const renderCell = (col, value, item) => {
    if (col === "createdAt") return formatDate(value);

    if (col === "imageUrl") {
      return value ? (
        <Avatar src={value} variant="rounded" sx={{ width: 60, height: 60 }} />
      ) : "-";
    }

    if (col === "buyers") {
      return (
        <Tooltip title="Show Buyers">
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              const result = onShowBuyers?.(item.id);
              if (Array.isArray(result)) {
                setBuyersData(result);
                setOpenBuyers(true);
              }
            }}
          >
            <PeopleIcon />
          </IconButton>
        </Tooltip>
      );
    }

    if (typeof value === "boolean") return value ? "Yes" : "No";

    return value ?? "-";
  };

  // ===== PAGINATION =====
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ===== FORM HANDLERS =====
  const handleSubmit = () => {
    if (editingItem) {
      onUpdate?.({ ...editingItem, ...formData });
    } else {
      onAdd?.(formData);
    }

    setOpenForm(false);
    setEditingItem(null);
    setFormData({});
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* ADD NEW */}
      {onAdd && (
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            setEditingItem(null);
            setFormData({});
            setOpenForm(true);
          }}
        >
          Add New
        </Button>
      )}

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col} sx={{ fontWeight: "bold" }}>
                  {col}
                </TableCell>
              ))}
              {!hideActions && <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id} hover>
                {columns.map((col) => (
                  <TableCell key={col}>
                    {renderCell(col, item[col], item)}
                  </TableCell>
                ))}

                {!hideActions && (
                  <TableCell>
                    {onUpdate && (
                      <IconButton
                        onClick={() => {
                          setEditingItem(item);
                          setFormData(item);
                          setOpenForm(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton onClick={() => onDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 6, 10]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* ADD / EDIT DIALOG */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
        <DialogTitle>
          {editingItem ? "Edit Item" : "Add New Item"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {columns
              .filter((c) => !["createdAt", "buyers"].includes(c))
              .map((field) => (
                <TextField
                  key={field}
                  label={field}
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  fullWidth
                />
              ))}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* BUYERS DIALOG */}
      <Dialog open={openBuyers} onClose={() => setOpenBuyers(false)} fullWidth>
        <DialogTitle>Buyers</DialogTitle>
        <DialogContent>
          {buyersData.length === 0 ? (
            <Typography>No data</Typography>
          ) : (
            buyersData.map((b, i) => (
              <Typography key={i}>
                Qty: {b.quantity} | Date: {formatDate(b.orderDate)}
              </Typography>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuyers(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DynamicComponent;




