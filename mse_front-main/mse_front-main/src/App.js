import { ColorModeContext, useMode } from "./theme";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Contacts from "./pages/contacts";
import Form from "./pages/form";

import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";


import Login from "./pages/login/Login";

import ListFournisseur from "./pages/fournisseur/ListFournisseur";
import FormFournisseur from "./pages/fournisseur/FormFournisseur";
import EditFournisseur from "./pages/fournisseur/EditFourniseur";
import FormProduit from "./pages/Produit/FormProduit";
import ListProduit from "./pages/Produit/ListPrduit";
import EditProduit from "./pages/Produit/EditPrdouit";
import FormUser from "./pages/user/FormUser";
import ListUsers from "./pages/user/ListUser";
import UpdateUser from "./pages/user/EditUser";
import FormProjet from "./pages/Projet/FormProjet";
import EditProjet from "./pages/Projet/EditProjet";
import ListProjet from "./pages/Projet/ListProjet";
import ListRapport from "./pages/Formulaire/ListRapport";
import DetailsProjet from "./pages/DetailsProjet/DetailsProjet";
import AffecterSuperviseur from "./pages/Affecter Projet/AffecterSuperviseur";
import AffecterClient from "./pages/Affecter Projet/AffecterClient";
import AffecterTechnicien from "./pages/Affecter Projet/AffecterTechnicien";
import ListTechnicienByProjet from "./pages/Affecter Projet/technicienByProjet";
import FormTache from "./pages/tache/FormTache";
import ListTache from "./pages/tache/ListTache";
import CardProjet from "./pages/Projet/CardProjet";
import FormTacheByProject from "./pages/tache/FormTacheByProject";
import EditTacheByProject from "./pages/tache/EditTacheByProject";
import CardTache from "./pages/tache/CardTache";
import CardFormulaire from "./pages/Formulaire/CardFormulaire";
import MainStep from "./pages/Formlairestepper/main";
import PdfComponent from "./reactPdf";
import ProfilePage from "./profilepage";
import { MyProSidebarProviderSuperviseur } from "./Superviseur/pages/global/sidebar/sidebarContextSuperviseur";
import MyComponent from "./Superviseur/pages/position/getUserPosition";
import ProtectedRouteHook from "./pages/login/protected-route-hook";
import ProtectedRoute from "./pages/login/Protected.js";
import DemandeProduit from "./Superviseur/pages/demande produit/DemandeProduit";
import UpdateDemandeProduit from "./Superviseur/pages/demande produit/UpdateDemandeProduit";
import DemandeAchat from "./Superviseur/pages/demande achat/DemandeAchat";
import UpdateDemandeAchat from "./Superviseur/pages/demande achat/UpdateDemandeAchat";
import ListDemandeProduit from "./Superviseur/pages/demande produit/ListDemandeProduit";
import ListDemandeAchat from "./Superviseur/pages/demande achat/ListDemandeAchat";
import TopbarSuperviseur from "./Superviseur/pages/global/TopbarSuperviseur";
import ListProduitSup from "./Superviseur/pages/produit/ListPrduit";
import ListPointage from "./pages/pointage.js/ListPointage";
import { useEffect } from "react";
import TopbarTechnicien from "./Technicien/global/TopbarTechnicien";
import { MyProSidebarProviderTechnicien } from "./Technicien/global/sidebar/sidebarContextTechnicien";
import CardProjetTechnicien from "./Technicien/pages/Projet/CardProjetTechnicien";
import CardTacheTechnicien from "./Technicien/pages/tache/CardTache";
import CardFormulaireTechnicien from "./Technicien/pages/Formulaire/CardFormulaire";
import ListDemandeProdduitTechnicien from "./Technicien/pages/demande produit/ListDemandeProduit";
import ListDemandeAchatTechnicien from "./Technicien/pages/demande achat/ListDemandeAchat";
import { MyProSidebarProviderClient } from "./client/pages/global/sidebar/sidebarContextClient";
import TopbarClient from "./client/pages/global/TopbarClient";
import CardProjetClient from "./client/pages/global/Projet/CardProjetClient";

function LinkAdmin() {
  const [theme, colorMode] = useMode();
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAdmin?<MyProSidebarProvider>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <Topbar />
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                
                 <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/DetailsProjet/:id" element={<DetailsProjet />} />

          

                <Route path="/formfournisseur" element={<FormFournisseur />} />
                <Route path="/listfourniseur" element={<ListFournisseur />} />
                <Route path="/formfournisseur/:id" element={<EditFournisseur />} />



                <Route path="/formproduit" element={<FormProduit />} />
                <Route path="/listproduit" element={<ListProduit />} />
                <Route path="/formproduit/:id" element={<EditProduit />} />

                <Route path="/formuser" element={<FormUser />} />
                <Route path="/listuser" element={<ListUsers />} />
                <Route path="/formuser/:id" element={<UpdateUser />} />

                {/* <Route path="/formformulaire/:id" element={<Formulaire />} /> */}
                <Route path="/formformulaire/:id" element={<MainStep />} />
                <Route path="/listformulaire" element={<ListRapport />} />
                {/* <Route path="/formformulaire/:id" element={<EditFournisseur />} /> */}

                <Route path="/cardprojet" element={<CardProjet />} />


                <Route path="/formprojet" element={<FormProjet />} />
                <Route path="/formprojet/:id" element={<EditProjet />} />
                <Route path="/listprojet" element={<ListProjet />} />
                <Route path="/affectersupperviseur" element={<AffecterSuperviseur />} />
                <Route path="/affecterclient" element={<AffecterClient />} />
                <Route path="/affectertechnicien" element={<AffecterTechnicien />} />

                <Route path="/formprojet/:id" element={<l />} />
                <Route path="/listtechnicienbyprojet/:id" element={<ListTechnicienByProjet />} />

                <Route path="/formtachebyprject" element={<FormTacheByProject />} />
                <Route path="/formtachebyprject/:id" element={<EditTacheByProject />} />

                <Route path="/cardtache" element={<CardTache />} />
                <Route path="/cardformulaire" element={<CardFormulaire />} />

                
                <Route path="/formtache" element={<FormTache />} />
                <Route path="/listtache" element={<ListTache />} />
                <Route path="/formtache/:id" element={<EditFournisseur />} />
                
                <Route path="/generatepdf" element={<PdfComponent />} />
                <Route path="/profilepage" element={<ProfilePage  />} />
                <Route path="/listpointage" element={<ListPointage  />} />


                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />

                <Route path="/demandeproduit" element={<DemandeProduit/>} />
                <Route path="/listdemandeproduit/:id" element={<UpdateDemandeAchat/>} />
                <Route path="/demandeproduit/:id" element={<UpdateDemandeProduit/>} />
                <Route path="/demandeachat" element={<DemandeAchat/>} />
                <Route path="/listdemandeproduit" element={<ListDemandeProduit/>} />
                <Route path="/listdemandeachat" element={<ListDemandeAchat/>} />


              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>:<CircularProgress color="secondary"/>}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
function LinkSuperviseur() {
  const [theme, colorMode] = useMode();
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    {isSuperviseur?  <MyProSidebarProviderSuperviseur>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <TopbarSuperviseur />
            <Routes>
                <Route path="/" element={<MyComponent/>} />
                
                 <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/DetailsProjet/:id" element={<DetailsProjet />} />

                <Route path="/demandeproduit" element={<DemandeProduit/>} />
                <Route path="/demandeproduit/:id" element={<UpdateDemandeProduit/>} />
                <Route path="/demandeachat" element={<DemandeAchat/>} />
                <Route path="/listdemandeproduit" element={<ListDemandeProduit/>} />
                <Route path="/listdemandeachat" element={<ListDemandeAchat/>} />


                <Route path="/formfournisseur" element={<FormFournisseur />} />
                <Route path="/listfourniseur" element={<ListFournisseur />} />
                <Route path="/formfournisseur/:id" element={<EditFournisseur />} />

                <Route path="/profilepage" element={<ProfilePage  />} />
                <Route path="/pointage" element={<MyComponent  />} />


                <Route path="/formproduit" element={<FormProduit />} />
                <Route path="/listproduit" element={<ListProduitSup />} />
                <Route path="/formproduit/:id" element={<EditProduit />} />

                <Route path="/formuser" element={<FormUser />} />
                <Route path="/listuser" element={<ListUsers />} />
                <Route path="/formuser/:id" element={<EditFournisseur />} />

                {/* <Route path="/formformulaire/:id" element={<Formulaire />} /> */}
                <Route path="/formformulaire/:id" element={<MainStep />} />
                <Route path="/listformulaire" element={<ListRapport />} />
                {/* <Route path="/formformulaire/:id" element={<EditFournisseur />} /> */}

                <Route path="/cardprojet" element={<CardProjet />} />


                <Route path="/formprojet" element={<FormProjet />} />
                <Route path="/formprojet/:id" element={<EditProjet />} />
                <Route path="/listprojet" element={<ListProjet />} />
                <Route path="/affectersupperviseur" element={<AffecterSuperviseur />} />
                <Route path="/affecterclient" element={<AffecterClient />} />
                <Route path="/affectertechnicien" element={<AffecterTechnicien />} />

                <Route path="/formprojet/:id" element={<EditFournisseur />} />
                <Route path="/listtechnicienbyprojet/:id" element={<ListTechnicienByProjet />} />

                <Route path="/formtachebyprject" element={<FormTacheByProject />} />
                <Route path="/formtachebyprject/:id" element={<EditTacheByProject />} />

                <Route path="/cardtache" element={<CardTache />} />
                <Route path="/cardformulaire" element={<CardFormulaire />} />

                
                <Route path="/formtache" element={<FormTache />} />
                <Route path="/listtache" element={<ListTache />} />
                <Route path="/formtache/:id" element={<EditFournisseur />} />
                
                <Route path="/generatepdf" element={<PdfComponent />} />

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProviderSuperviseur>:<CircularProgress color="secondary"/>}
   
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

function LinkTechnicien() {
  const [theme, colorMode] = useMode();
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    {isTechnicien?  <MyProSidebarProviderTechnicien>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <TopbarTechnicien />
            <Routes>
                <Route path="/" element={<MyComponent/>} />
                
                 <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/DetailsProjet/:id" element={<DetailsProjet />} />

                <Route path="/demandeproduit" element={<DemandeProduit/>} />
                <Route path="/demandeproduit/:id" element={<UpdateDemandeProduit/>} />
                <Route path="/demandeachat" element={<DemandeAchat/>} />
                <Route path="/listdemandeproduit" element={<ListDemandeProdduitTechnicien/>} />
                <Route path="/listdemandeachat" element={<ListDemandeAchatTechnicien/>} />


                <Route path="/formfournisseur" element={<FormFournisseur />} />
                <Route path="/listfourniseur" element={<ListFournisseur />} />
                <Route path="/formfournisseur/:id" element={<EditFournisseur />} />

                <Route path="/profilepage" element={<ProfilePage  />} />
                <Route path="/pointage" element={<MyComponent  />} />


                <Route path="/formproduit" element={<FormProduit />} />
                <Route path="/listproduit" element={<ListProduitSup />} />
                <Route path="/formproduit/:id" element={<EditProduit />} />

                <Route path="/formuser" element={<FormUser />} />
                <Route path="/listuser" element={<ListUsers />} />
                <Route path="/formuser/:id" element={<EditFournisseur />} />

                {/* <Route path="/formformulaire/:id" element={<Formulaire />} /> */}
                <Route path="/formformulaire/:id" element={<MainStep />} />
                <Route path="/listformulaire" element={<ListRapport />} />
                {/* <Route path="/formformulaire/:id" element={<EditFournisseur />} /> */}

                <Route path="/cardprojet" element={<CardProjetTechnicien />} />


                <Route path="/formprojet" element={<FormProjet />} />
                <Route path="/formprojet/:id" element={<EditProjet />} />
                <Route path="/listprojet" element={<ListProjet />} />
                <Route path="/affectersupperviseur" element={<AffecterSuperviseur />} />
                <Route path="/affecterclient" element={<AffecterClient />} />
                <Route path="/affectertechnicien" element={<AffecterTechnicien />} />

                <Route path="/formprojet/:id" element={<EditFournisseur />} />
                <Route path="/listtechnicienbyprojet/:id" element={<ListTechnicienByProjet />} />

                <Route path="/formtachebyprject" element={<FormTacheByProject />} />
                <Route path="/formtachebyprject/:id" element={<EditTacheByProject />} />

                <Route path="/cardtache" element={<CardTacheTechnicien />} />
                <Route path="/cardformulaire" element={<CardFormulaireTechnicien />} />

                
                <Route path="/formtache" element={<FormTache />} />
                <Route path="/listtache" element={<ListTache />} />
                <Route path="/formtache/:id" element={<EditFournisseur />} />
                
                <Route path="/generatepdf" element={<PdfComponent />} />

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProviderTechnicien>:<CircularProgress color="secondary"/>}
   
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

function LinkClient() {
  const [theme, colorMode] = useMode();
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    {isClient?  <MyProSidebarProviderClient>
        <div style={{ height: "100%", width: "100%" }}>
          <main>
            <TopbarClient />
            <Routes>
                <Route path="/" element={<CardProjetClient/>} />
                
                 <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team" element={<Team />} />
                <Route path="/DetailsProjet/:id" element={<DetailsProjet />} />

                <Route path="/demandeproduit" element={<DemandeProduit/>} />
                <Route path="/demandeproduit/:id" element={<UpdateDemandeProduit/>} />
                <Route path="/demandeachat" element={<DemandeAchat/>} />
                <Route path="/listdemandeproduit" element={<ListDemandeProdduitTechnicien/>} />
                <Route path="/listdemandeachat" element={<ListDemandeAchatTechnicien/>} />


                <Route path="/formfournisseur" element={<FormFournisseur />} />
                <Route path="/listfourniseur" element={<ListFournisseur />} />
                <Route path="/formfournisseur/:id" element={<EditFournisseur />} />

                <Route path="/profilepage" element={<ProfilePage  />} />
                <Route path="/pointage" element={<MyComponent  />} />


                <Route path="/formproduit" element={<FormProduit />} />
                <Route path="/listproduit" element={<ListProduitSup />} />
                <Route path="/formproduit/:id" element={<EditProduit />} />

                <Route path="/formuser" element={<FormUser />} />
                <Route path="/listuser" element={<ListUsers />} />
                <Route path="/formuser/:id" element={<EditFournisseur />} />

                {/* <Route path="/formformulaire/:id" element={<Formulaire />} /> */}
                <Route path="/formformulaire/:id" element={<MainStep />} />
                <Route path="/listformulaire" element={<ListRapport />} />
                {/* <Route path="/formformulaire/:id" element={<EditFournisseur />} /> */}

                <Route path="/cardprojet" element={<CardProjetClient />} />


                <Route path="/formprojet" element={<FormProjet />} />
                <Route path="/formprojet/:id" element={<EditProjet />} />
                <Route path="/listprojet" element={<ListProjet />} />
                <Route path="/affectersupperviseur" element={<AffecterSuperviseur />} />
                <Route path="/affecterclient" element={<AffecterClient />} />
                <Route path="/affectertechnicien" element={<AffecterTechnicien />} />

                <Route path="/formprojet/:id" element={<EditFournisseur />} />
                <Route path="/listtechnicienbyprojet/:id" element={<ListTechnicienByProjet />} />

                <Route path="/formtachebyprject" element={<FormTacheByProject />} />
                <Route path="/formtachebyprject/:id" element={<EditTacheByProject />} />

                <Route path="/cardtache" element={<CardTache />} />
                <Route path="/cardformulaire" element={<CardFormulaire />} />

                
                <Route path="/formtache" element={<FormTache />} />
                <Route path="/listtache" element={<ListTache />} />
                <Route path="/formtache/:id" element={<EditFournisseur />} />
                
                <Route path="/generatepdf" element={<PdfComponent />} />

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProviderClient>:<CircularProgress color="secondary"/>}
   
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
const App = () => {
  const [, colorMode] = useMode();
  const [isClient, isAdmin,isSuperviseur,isTechnicien, userData] = ProtectedRouteHook()

  return (
    <ColorModeContext.Provider value={colorMode}>
    <CssBaseline />
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Routes>
          <Route path="/" element={isAdmin?<LinkAdmin />:isSuperviseur?<LinkSuperviseur />:isTechnicien?<LinkTechnicien />:isClient?<LinkClient />:<Login/>}/>
<Route path="/login" element={<Login/>}/>

<Route path="/admin/*" element={<ProtectedRoute auth={isAdmin}><LinkAdmin /></ProtectedRoute>} />
<Route path="/superviseur/*" element={<ProtectedRoute auth={isSuperviseur}><LinkSuperviseur /></ProtectedRoute>} />
<Route path="/technicien/*" element={<ProtectedRoute auth={isTechnicien}><LinkTechnicien /></ProtectedRoute>} />
<Route path="/client/*" element={<ProtectedRoute auth={isClient}><LinkClient /></ProtectedRoute>} />

</Routes>
        </main>
      </div>
</ColorModeContext.Provider>
  );
};

export default App;
