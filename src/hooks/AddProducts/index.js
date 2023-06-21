import { useQuery, useMutation, useQueryClient } from "react-query";
import apiService from "../../api/axios.js";

const useGetItems = () => {
  return useQuery(["get-products"], async () => {
    try {
      const response = await apiService.post(
        "http://10.0.2.2:8000/api/products"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
};

const useAddProducts = () => {
  const queryClient = new useQueryClient();
  return useMutation(
    "get-products",
    async (data) => {
      console.log(data);
      try {
        let response = await apiService.post(`http://10.0.2.2:8000/api/add-product`, data, {
          Accept: `application/json`,
          "Content-Type": "application/x-www-form-urlencoded",
          api: true,
        });
        console.log(response, data);
        return response.data;
      } catch (error) {
        console.log(error.message); // Log the error message
        console.log(error.response); // Log the error response
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["get-products-list"]);
      },
    }
  );
};

const hooks = {
  useAddProducts,
  useGetItems,
};

export default hooks;
