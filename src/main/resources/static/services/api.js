import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getMeals = () => axios.get(`${API_URL}/meals/`);
export const getMealsByProduct = (productName) => axios.get(`${API_URL}/meals/by-product?productName=${productName}`);
export const createMeal = (mealName) => axios.post(`${API_URL}/meals/create?mealName=${mealName}`);
export const bulkCreateMeals = (mealNames) => axios.post(`${API_URL}/meals/bulk-create`, mealNames);
export const updateMeal = (id, newName) => axios.put(`${API_URL}/meals/update/${id}?newName=${newName}`);
export const deleteMeal = (id) => axios.delete(`${API_URL}/meals/delete/${id}`);

export const getProducts = () => axios.get(`${API_URL}/products/`);
export const createProduct = (name, caloriesPer100g) => axios.post(`${API_URL}/products/create?name=${name}&caloriesPer100g=${caloriesPer100g}`);
export const updateProduct = (id, name, caloriesPer100g) => axios.put(`${API_URL}/products/update/${id}?name=${name}&caloriesPer100g=${caloriesPer100g}`);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/delete/${id}`);
export const calculateCalories = (productCount, food, gram) => axios.get(`${API_URL}/products/CalculateCalories?productCount=${productCount}&food=${food}&gram=${gram}`);

export const getMealProducts = () => axios.get(`${API_URL}/mealProducts/`);
export const createMealProduct = (grams, mealId, productId) => axios.post(`${API_URL}/mealProducts/create?grams=${grams}&mealId=${mealId}&productId=${productId}`);
export const updateMealProduct = (id, grams) => axios.put(`${API_URL}/mealProducts/update/${id}?grams=${grams}`);
export const deleteMealProduct = (id) => axios.delete(`${API_URL}/mealProducts/delete/${id}`);