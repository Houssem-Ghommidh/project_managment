import http from "../http-commons";

const getAll = () => {
  return http.get("/demande");
};

const getDemandesByUser = () => {
    return http.get("/demande/user");
}

const getDemandesById = id => {
    return http.get(`/demande/${id}`);
}

const updateDemandes = (id, data) => {
    return http.put(`/demande/${id}`, data);
  };

const deleteDemandes = id => {
    return http.delete(`/demande/${id}`);
}

const createDemande = data => {
    return http.post("/demande",data);
}

const modifStatus = (data,id) =>{
    
    return http.put(`/demande/${id}`,data);
}
  


const DemandesService = {
    getAll,
    getDemandesById,
    getDemandesByUser,
    updateDemandes,
    deleteDemandes,
    createDemande,
    modifStatus
}


export default DemandesService;