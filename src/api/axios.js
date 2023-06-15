import Axios from "axios";

const baseUrl = import.meta.env.BASE_URL;

const apiService = Axios.create();

apiService.defaults.baseURL = baseUrl;

export default apiService;