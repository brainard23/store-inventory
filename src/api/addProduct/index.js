import apiService from "../axios";

export const addProduct = async (data) => {
  try {
    let response = await apiService.post("add-product", data, {
      Accept: "application/json",
      body: JSON.stringify(payload),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
