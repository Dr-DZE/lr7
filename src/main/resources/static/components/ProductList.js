import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Box } from '@mui/material';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editCalories, setEditCalories] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createProduct(newProductName, parseInt(newCalories));
      setNewProductName('');
      setNewCalories('');
      fetchProducts();
    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateProduct(id, editProductName, parseInt(editCalories));
      setEditProductId(null);
      setEditProductName('');
      setEditCalories('');
      fetchProducts();
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };

  return (
    <Box>
      <h2>Продукты</h2>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Название продукта"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <TextField
          label="Калории на 100г"
          type="number"
          value={newCalories}
          onChange={(e) => setNewCalories(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreate}>Создать</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Калории на 100г</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                {editProductId === product.id ? (
                  <TextField
                    value={editProductName}
                    onChange={(e) => setEditProductName(e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </TableCell>
              <TableCell>
                {editProductId === product.id ? (
                  <TextField
                    type="number"
                    value={editCalories}
                    onChange={(e) => setEditCalories(e.target.value)}
                  />
                ) : (
                  product.caloriesPer100g
                )}
              </TableCell>
              <TableCell>
                {editProductId === product.id ? (
                  <Button onClick={() => handleUpdate(product.id)}>Сохранить</Button>
                ) : (
                  <Button onClick={() => {
                    setEditProductId(product.id);
                    setEditProductName(product.name);
                    setEditCalories(product.caloriesPer100g);
                  }}>
                    Редактировать
                  </Button>
                )}
                <Button onClick={() => handleDelete(product.id)} color="error">Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default ProductList;