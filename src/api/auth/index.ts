import { IFAuth } from "../../interface";
import axios from "../axios";
const APILogin = (params: IFAuth) =>
  axios
    .post("/login", {
      email: params.username,
      password: params.password,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      // handle error
      return error.response;
    });
export { APILogin };
