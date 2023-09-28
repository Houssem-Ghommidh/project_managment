import React, { useEffect, useState } from "react";

const ProtectedRouteHook = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [role, setrole] = useState(localStorage.getItem("role"));
  const [isTechnicien, setIsTechnicien] = useState(null);
  const [isClient, setIsClient] = useState(null);
  const [isSuperviseur, setIsSuperviseur] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    if (userData != null) {
      if (userData.role === "admin") {
        setIsAdmin(true);
        setIsSuperviseur(false);
        setIsClient(false);
        setIsTechnicien(false);
      } else if (userData.role === "superviseur") {
        setIsAdmin(false);
        setIsSuperviseur(true);
        setIsTechnicien(false);
        setIsClient(false);
      } else if (userData.role === "client") {
        setIsAdmin(false);
        setIsTechnicien(false);

        setIsClient(true);
        setIsSuperviseur(false);
      } else if (userData.role === "technicien") {
        setIsAdmin(false);
        setIsSuperviseur(false);

        setIsTechnicien(true);
        setIsClient(false);
      }
    } else {
      setIsAdmin(false);
      setIsClient(false);
      setIsTechnicien(false);
      setIsSuperviseur(false);
    }
  }, []);

  return [isClient, isAdmin, isSuperviseur, isTechnicien, userData];
};

export default ProtectedRouteHook;
