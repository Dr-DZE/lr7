import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Box, MenuItem, Select } from '@mui/material';
import { getMealProducts, createMealProduct, updateMealProduct, deleteMealProduct, getMeals, getProducts } from '../services/api';

function MealProductList() {
  const [mealProducts, setMealProducts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [newGrams, setNewGrams] = useState('');
  const [newMealId, setNewMealId] = useState('');
  const [newProductId, setNewProductId] = useState('');
  const [editMealProductId, setEditMealProductId] = useState(null);
  const [editGrams, setEditGrams] = useState('');

  useEffect(() => {
    fetchMealProducts();
    fetchMeals();
    fetchProducts();
  }, []);

  const fetchMealProducts = async () => {
    try {
      const response = await getMealProducts();
      setMealProducts(response.data);
    } catch (error) {
      console.error('Ошибка при получении связей:', error);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await getMeals();
      setMeals(response.data);
    } catch (error) {
      console.error('Ошибка при получении блюд:', error);
    }
  };

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
      await createMealProduct(parseInt(newGrams), parseInt(newMealId), parseInt(newProductId));
      setNewGrams('');
      setNewMealId('');
      setNewProductId('');
      fetchMealProducts();
    } catch (error) {
      console.error('Ошибка при создании связи:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateMealProduct(id, parseInt(editGrams));
      setEditMealProductId(null);
      setEditGrams('');
      fetchMealProducts();
    } catch (error) {
      console.error('Ошибка при обновлении связи:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMealProduct(id);
      fetchMealProducts();
    } catch (error) {
      console.error('Ошибка при удалении связи:', error);
    }
  };

  return (
    <Box>
      <h2>Связи Блюдо-Продукт</h2>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Вес (г)"
          type="number"
          value={newGrams}
          onChange={(e) => setNewGrams(e.target.value)}
        />
        <Select
          value={newMealId}
          onChange={(e) => setNewMealId(e.target.value)}
          displayEmpty
          renderValue={(selected) => selected ? meals.find(m => m.id === parseInt(selected))?.name : 'Выберите блюдо'}
        >
          {meals.map((meal) => (
            <MenuItem key={meal.id} value={meal.id}>{meal.name}</MenuItem>
          ))}
        </Select>
        <Select
          value={newProductId}
          onChange={(e) => setNewProductId(e.target.value)}
          displayEmpty
          renderValue={(selected) => selected ? products.find(p => p.id === parseInt(selected))?.name : 'Выберите продукт'}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleCreate}>Создать</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Блюдо</TableCell>
            <TableCell>Продукт</TableCell>
            <TableCell>Вес (г)</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mealProducts.map((mp) => (
            <TableRow key={mp.id}>
              <TableCell>{mp.id}</TableCell>
              <TableCell>{mp.meal?.name}</TableCell>
              <TableCell>{mp.product?.name}</TableCell>
              <TableCell>
                {editMealProductId === mp.id ? (
                  <TextField
                    type="number"
                    value={editGrams}
                    onChange={(e) => setEditGrams(e.target.value)}
                  />
                ) : (
                  mp.grams
                )}
              </TableCell>
              <TableCell>
                {editMealProductId === mp.id ? (
                  <Button onClick={() => handleUpdate(mp.id)}>Сохранить</Button>
                ) : (
                  <Button onClick={() => { setEditMealProductId(mp.id); setEditGrams(mp.grams); }}>
                    Редактировать
                  </Button>
                )}
                <Button onClick={() => handleDelete(mp.id)} color="error">Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default MealProductList;