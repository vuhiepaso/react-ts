import axios from "axios";
const baseURL = "https://oauth.casso.vn/v2";
const apikey =
  "AK_CS.12b62990f14c11eda50bad6a777fc4ca.kTqqJar3wKSiPVC1i3ZUimF8n1GrH2tn0OQHNmTq9ky2mlbjz4xreLzrhQAtPvKbE4SzFge4";

const checkPayment = (numAc: string) =>
  axios
    .post(
      `${baseURL}/sync`,
      {
        bank_acc_id: numAc,
      },
      {
        headers: {
          Authorization: `Apikey ${apikey}`,
        },
      }
    )
    .then(function (response) {
      console.log("responsePAY", response);
      return response;
    })
    .catch(function (error) {
      console.log("errorPAY", error);
      return error.response;
    });

export { checkPayment };
