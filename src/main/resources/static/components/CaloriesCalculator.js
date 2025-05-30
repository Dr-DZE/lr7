import React, { useState } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { calculateCalories } from '../services/api';

function CaloriesCalculator() {
  const [productCount, setProductCount] = useState('');
  const [products, setProducts] = useState([{ name: '', grams: '' }]);
  const [results, setResults] = useState([]);

  const handleProductCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setProductCount(count);
    setProducts(Array(count).fill().map((_, i) => products[i] || { name: '', grams: '' }));
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const handleCalculate = async () => {
    try {
      const food = products.map(p => p.name);
      const gram = products.map(p => parseInt(p.grams));
      const response = await calculateCalories(productCount, food, gram);
      setResults(response.data);
    } catch (error) {
      console.error('Ошибка при расчёте калорий:', error);
    }
  };

  return (
    <Box>
      <h2>Калькулятор калорий</h2>
      <TextField
        label="Количество продуктов"
        type="number"
        value={productCount}
        onChange={handleProductCountChange}
        style={{ marginBottom: '20px' }}
      />
      {products.map((product, index) => (
        <Box key={index} display="flex" gap={2} mb={2}>
          <TextField
            label={`Продукт ${index + 1}`}
            value={product.name}
            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
          />
          <TextField
            label="Вес (г)"
            type="number"
            value={product.grams}
            onChange={(e) => handleProductChange(index, 'grams', e.target.value)}
          />
        </Box>
      ))}
      <Button variant="contained" onClick={handleCalculate}>Рассчитать</Button>
      {results.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Результат</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default CaloriesCalculator;