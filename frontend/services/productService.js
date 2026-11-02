import axios from 'axios';

export const getKidsTShirts = async () => {
  try {
    const response = await axios.get('/api/products/kids-tshirts');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch kids t-shirts", error);
    throw error;
  }
};
