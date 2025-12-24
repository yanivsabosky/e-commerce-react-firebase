// Displaying The Categories In The Store  + Actions Such AS (Add,Update,Delete)
import { serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { load, delete_action, add, update } from "../Utils/utilities";
import DynamicComponent from "../DynamicComponent";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function Admin_categories() {
  const [categories, setCategories] = useState([]);
  const [addUp, setAdd] = useState(false);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "" });

  // DELETE
  async function handleDelete(id) {
  if (!id) {
    console.error("Missing category id");
    return;
  }

  await delete_action("categories", id);

  setCategories(categories.filter(c => c.id !== id));

}


  // ADD
  async function handleAddCategory(data) {
  const body = {
    name: data.name,            
    createdAt: serverTimestamp(),
  };

  const docRef = await add("categories", body);

  setCategories([
    ...categories,
    {
      id: docRef.id,
      ...body,
    },
  ]);
}


  // UPDATE
 async function handleUpdateCategory(data) {
  if (!data.id) {
    console.error("Missing category id for update");
    return;
  }

  // Update Fields in FireStore
  await update("categories", data.id, {
    name: data.name,
  });

  // Update state
  setCategories(
    categories.map((c) =>
      c.id === data.id
        ? { ...c, name: data.name }
        : c
    )
  );

  // Clearing Editing Mode
  setEditing(false);
  setAdd(false);
  setFormData({ id: "", name: "" });
}


  // LOAD
  useEffect(() => {
    async function loading() {
      const data = await load("categories");
      setCategories(data);
    }
    loading();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!editing) handleAddCategory(formData);
    else handleUpdateCategory(formData);

    setAdd(false);
    setEditing(false);
    setFormData({ id: "", name: "" });
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Categories Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditing(false);
            setFormData({ id: "", name: "" });
            setAdd(true);
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* FORM SECTION */}
      {addUp && (
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editing ? "Update Category" : "Add New Category"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Category Name"
                required
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained">
                  {editing ? "Update" : "Submit"}
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setAdd(false);
                    setEditing(false);
                    setFormData({ id: "", name: "" });
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      )}

      {/* TABLE SECTION */}
      {!addUp && (
        <DynamicComponent
          data={categories}
          columns={[ "name", "createdAt"]}
          onDelete={handleDelete}
          onUpdate={(item) => {
            setEditing(true);
            setFormData({ id: item.id, name: item.name });
            setAdd(true);
          }}
        />
      )}
    </Box>
  );
}

export default Admin_categories;

