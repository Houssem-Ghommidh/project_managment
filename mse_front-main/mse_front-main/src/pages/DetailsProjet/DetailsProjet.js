import React, { useState, useEffect } from 'react'
import ProjetsService from '../../service/ProjetService';
import AuthService from '../../service/AuthService';
import { useParams } from 'react-router-dom';
import './detailsProjet.css'


const DetailsProjet = () => {
  const { id } = useParams();
  const [currentProject, setCurrentProject] = useState({});
  const [superviseur, setSuperviseur] = useState({});
  const [client, setClient] = useState({});
  const [technicians, setTechnicians] = useState([]);

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  useEffect(() => {

    const fetchData = async () => {
      let data4 = [];
      try {
        // First API call
        const response1 = await fetch('http://localhost:8000/api/projet/' + id);
        const data1 = await response1.json();

        // Second API call using data1
        if (data1['data'].id_superviseur != undefined && data1['data'].id_client != undefined) {
          const response2 = await fetch(`http://localhost:8000/api/users/${data1['data'].id_superviseur}`);
          const data2 = await response2.json();

          // Third API call using data2
          const response3 = await fetch(`http://localhost:8000/api/users/${data1['data'].id_client}`);
          const data3 = await response3.json();


          setSuperviseur(data2['data']);
          setClient(data3['data']);
          console.log(data4);
        }
        //Get List of Users with idProject = to this project
        const response4 = await fetch(`http://localhost:8000/api/users/project/${data1['data']._id}`);
        data4 = await response4.json();

        //Check the technicians affected to this project
        data4.forEach(element => {
          element.selected = true;
        });

        //Get List of Users with idProject != to this project
        const response5 = await fetch(`http://localhost:8000/api/users/techniciens/${data1['data']._id}`);
        const data5 = await response5.json();

        //merge the two lists
        data4.push(...data5);
        setTechnicians(data4)

        setCurrentProject(data1['data']);
        console.log(currentProject)


        // Process the result of the third API call
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    return () => {

    }
  }, []);

  // -- 


  const handleCheckboxChange = (technicianId) => {
    setTechnicians((prevTechnicians) =>
      prevTechnicians.map((technician) =>
        technician._id === technicianId
          ? { ...technician, selected: !technician.selected }
          : technician
      )
    );
  };

  const handleSaveButtonClick = () => {
    const selectedTechnicians = technicians.filter(
      (technician) => technician.selected
    );
    const notSelectedTechnicians = technicians.filter(
      (technician) => !technician.selected
    );
    console.log(notSelectedTechnicians)
    // Perform save operation with selected technicians
    ProjetsService.affecterTechniciens({ "projectId": null, "techniciens": notSelectedTechnicians }).then((result) => {
      console.log(result)
    })
    ProjetsService.affecterTechniciens({ "projectId": currentProject._id, "techniciens": selectedTechnicians }).then((result) => {
      console.log(result)
    })
    window.location.reload()
  };
  const format = (deadline) => {
    if (deadline != null)
      return deadline = deadline.substring(0, currentProject.deadLine.indexOf("T"))
  }
  return (
    <div>
      <div className='outer-div'>
        <h1>Project Details</h1>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Supervisor</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentProject.nom_projet}</td>
              <td>{format(currentProject.deadLine)}</td>
              <td>{currentProject.status}</td>
              <td>{superviseur.first_name} {superviseur.last_name}</td>
              <td>{client.first_name} {client.last_name}</td>

            </tr>

          </tbody>
        </table>

        <h2>Technicians</h2>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((technician) => (
              <tr key={technician._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={technician.selected}
                    onChange={() => handleCheckboxChange(technician._id)}
                  />
                </td>
                <td>{technician.first_name}  {technician.last_name} </td>
                <td>{technician.email}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">
                <button onClick={handleSaveButtonClick}>Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default DetailsProjet
