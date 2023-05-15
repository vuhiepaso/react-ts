import axios from "../axios";
// axios.defaults.baseURL = "https://lux2-api-dev.lux.vmo.group/api/v1";
axios.defaults.baseURL = "https://www.mockachino.com/512c55e4-bb76-49/";

const listProduct = (page: number, per_page: number) =>
  axios
    .get(`product`)
    .then(function (response) {
      //   console.log("response", response);
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

export { listProduct };
