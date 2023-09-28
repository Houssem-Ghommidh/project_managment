import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

const login = (email, password) => {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data.token);
        }
  
        return response.data;
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };  

  const findTechnicien = () => {
    return axios
      .get(API_URL + "technicien")
      .then((response) => {
        return response.data;
      });
  };



  const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id)
    .then((response) => {
      return response.data;
    })
  }

  const findClient = () => {
    return axios
      .get(API_URL + "client")
      .then((response) => {
        return response.data;
      });
  };

  const findSuperviseur = async (id) => {
    const response = await axios
      .get("http://localhost:8000/api/users/" + id);
    return response.data['data'];
  };

  const findAdmin = () => {
    return axios
      .get(API_URL + "admin")
      .then((response) => {
        return response.data;
      });
  };

  const findProduits = () => {
    return axios
      .get(API_URL + "admin")
      .then((response) => {
        return response.data;
      });
  };

  
  export default {
    login,
    logout,
    getCurrentUser,
    findTechnicien,
    findClient,
    findSuperviseur,
    findAdmin,
    deleteUser,
    findProduits
    
    
  };