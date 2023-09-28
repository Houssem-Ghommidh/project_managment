import http from "../http-commons";

const getAll = () => {
  return http.get("/rapport");
};

const getRapportsById = id => {
    return http.get(`/rapport/${id}`);
}

const updateRapports = (id, data) => {
    return http.put(`/rapport/${id}`, data);
  };

const deleteRapports = id => {
    return http.delete(`/rapport/${id}`);
}

const createRapport = data => {
    return http.post("/rapport",data);
}

  


const RapportService = {
    getAll,
    getRapportsById,
    updateRapports,
    deleteRapports,
    createRapport 
}


export default RapportService;