// src/utils/NewsApi.js

const API_KEY = "302a15ed09b944aaa129ae6f4878b1d5";
const BASE_URL = "https://newsapi.org/v2/everything";

export const fetchNews = async (query) => {
  const today = new Date().toISOString().split("T")[0];
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  try {
    const response = await fetch(
      `${BASE_URL}?q=${query}&from=${lastWeek}&to=${today}&pageSize=100&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar as notícias");
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    throw new Error(error.message);
  }
};
