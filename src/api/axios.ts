import axios from "axios";
// 1 baseURL
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// 2 headers (token)
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

// 3 handle request
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 4 handle response
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response.status);
    switch (error.response.status) {
      case 401:
        //handle case 401
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);
export default axios;
