import http from "../http-commons";

const getAll = () => {
  return http.get("/tache");
};
const getByIdProject = (id) => {
    return http.get(`/tache/project/${id}`);
  };
  
const gettacheByUser = () => {
    return http.get("/tache/user");
}

const gettacheById = id => {
    return http.get(`/tache/one/${id}`);
}

const updatetache = (id, data) => {
    return http.put(`/tache/one/${id}`, data);
  };

const deletetache = id => {
    return http.delete(`/tache/one/${id}`);
}

const createTache = data => {
    return http.post("/tache",data);
}

  


const TacheService = {
    getAll,
    gettacheById,
    gettacheByUser,
    updatetache,
    deletetache,
    getByIdProject,
    createTache
}


export default TacheService;