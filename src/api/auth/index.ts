import { IFAuth, IFRegister } from "../../interface";
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

const APIregister = (params: IFRegister) =>
  axios
    .post("accounts/register", params)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
export { APILogin, APIregister };
