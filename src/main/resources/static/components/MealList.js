import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Box } from '@mui/material';
import { getMeals, createMeal, updateMeal, deleteMeal, getMealsByProduct } from '../services/api';

function MealList() {
  const [meals, setMeals] = useState([]);
  const [newMealName, setNewMealName] = useState('');
  const [editMealId, setEditMealId] = useState(null);
  const [editMealName, setEditMealName] = useState('');
  const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await getMeals();
      setMeals(response.data);
    } catch (error) {
      console.error('Ошибка при получении блюд:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getMealsByProduct(searchProduct);
      setMeals(response.data);
    } catch (error) {
      console.error('Ошибка при поиске блюд по продукту:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createMeal(newMealName);
      setNewMealName('');
      fetchMeals();
    } catch (error) {
      console.error('Ошибка при создании блюда:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateMeal(id, editMealName);
      setEditMealId(null);
      setEditMealName('');
      fetchMeals();
    } catch (error) {
      console.error('Ошибка при обновлении блюда:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeal(id);
      fetchMeals();
    } catch (error) {
      console.error('Ошибка при удалении блюда:', error);
    }
  };

  return (
    <Box>
      <h2>Блюда</h2>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Название продукта для поиска"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>Найти</Button>
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Название нового блюда"
          value={newMealName}
          onChange={(e) => setNewMealName(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreate}>Создать</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.id}</TableCell>
              <TableCell>
                {editMealId === meal.id ? (
                  <TextField
                    value={editMealName}
                    onChange={(e) => setEditMealName(e.target.value)}
                  />
                ) : (
                  meal.name
                )}
              </TableCell>
              <TableCell>
                {editMealId === meal.id ? (
                  <Button onClick={() => handleUpdate(meal.id)}>Сохранить</Button>
                ) : (
                  <Button onClick={() => { setEditMealId(meal.id); setEditMealName(meal.name); }}>
                    Редактировать
                  </Button>
                )}
                <Button onClick={() => handleDelete(meal.id)} color="error">Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default MealList;