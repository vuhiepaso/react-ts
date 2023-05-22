import axios from "../axios";

const GetEquipments = () =>
  axios
    .get("equipment/list")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

interface Equipments {
  id: number;
  name?: string;
  isActive?: boolean;
  status?: boolean;
}
const changeEquipments = (prs: Equipments) =>
  axios
    .patch(`equipment/update/${prs.id}`, { ...prs })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

const removeEquipments = (id: number) =>
  axios
    .delete(`equipment/delete/${id}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

export { GetEquipments, changeEquipments, removeEquipments };
