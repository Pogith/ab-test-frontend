import axios from "axios";

export const axiosGetRequest = async (url) => {
  try {
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (err) {
    console.error("Error", err);
  }
};

export const axiosPostRequest = async (url, data) => {
  try {
    return await axios.post(url, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (err) {
    console.error("Error", err);
  }
};

export const axiosDeleteRequest = async (url) => {
  try {
    return await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (err) {
    console.error("Error", err);
  }
};
