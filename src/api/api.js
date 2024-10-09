import axios from 'axios';

export const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get('https://phimapi.com/danh-sach/phim-moi-cap-nhat');
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchMovieDetails = async (slug) => {
  try {
    const response = await axios.get(`https://phimapi.com/phim/${slug}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchMovieByCategory = async (category) => {
  try {
    const response = await axios.get(`https://phimapi.com/v1/api/danh-sach/${category}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from API');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}