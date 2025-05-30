import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import MealList from './components/MealList';
import ProductList from './components/ProductList';
import MealProductList from './components/MealProductList';
import CaloriesCalculator from './components/CaloriesCalculator';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>TryMe</Typography>
          <Button color="inherit" component={Link} to="/">Блюда</Button>
          <Button color="inherit" component={Link} to="/products">Продукты</Button>
          <Button color="inherit" component={Link} to="/meal-products">Блюдо-Продукт</Button>
          <Button color="inherit" component={Link} to="/calculate">Калории</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<MealList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/meal-products" element={<MealProductList />} />
          <Route path="/calculate" element={<CaloriesCalculator />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;