import { useQuery, useMutation, useQueryClient } from "react-query";
import apiService from "../../api/axios";

const useAddProducts = () => {
  const queryClient = new useQueryClient();
  return useMutation("get-products-list", async (data) => {
    try {
      let response = await apiService.post(`api/add-products`, data, {
        Accept: `application/json`,
        "Content-Type": `multipart/form-data`,
        api: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, {
    onSuccess: () => { 
        queryClient.refetchQueries(["get-products-list"]);
    }
  });
};

const hooks = {
  useAddProducts,
};

export default hooks;
