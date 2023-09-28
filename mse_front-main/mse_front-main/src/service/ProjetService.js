import http from "../http-commons";

const getAll = () => {
  return http.get("/projet");
};

const getProjetByDate = (value) => {
    let data = {
        'createdAt': { '$gt': value }
    }
    return http.post("/projet/filtrage",data)
}

const getProjetsByUser = () => {
    return http.get("/projet/user");
}

const getProjetsById = async id => {
    return await http.get(`/projet/${id}`);
}

const updateProjets = (id, data) => {
    return http.put(`/projet/${id}`, data);
  };

const deleteProjets = id => {
    return http.delete(`/projet/${id}`);
}
const affecterTechniciens = async data => {
    return await http.patch(`/projet/affect`,data);
}


const createProjet = data => {
    console.log("data : --- \n " + data)
    return http.post("/projet",data);
}

  


const ProjetsService = {
    getAll,
    getProjetsById,
    getProjetsByUser,
    updateProjets,
    deleteProjets,
    createProjet,
    getProjetByDate,
    affecterTechniciens
}


export default ProjetsService;