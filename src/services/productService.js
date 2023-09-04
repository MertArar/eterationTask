import axios from "axios";

const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
