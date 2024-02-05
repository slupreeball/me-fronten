import { Route, Routes } from "react-router-dom"
import SignIn from "./pages/login";
import SignUp from "./pages/register";
import Profile from "./pages/profile";
import NavBar from "./components/header/navbar";
//import { AuthProvider } from "./components/authcontext"; 

// Cars 
import AddCars from "./pages/cars/addcar";
import Cars from "./pages/cars/cars";
import UpdateCar from "./pages/cars/updatecar";
//Drivers
import Drivers from "./pages/drivers/drivers";
import AddDriver from "./pages/drivers/adddriver";
import UpdateDriver from "./pages/drivers/updatedriver";
//Company
import Company from "./pages/company/company";
import AddCompany from "./pages/company/addcompany";
import UpdateCompany from "./pages/company/updatecompany";
//Users
import Users from "./pages/users/users";
import UpdateUser from "./pages/users/updateuser";

function App() {
  return (
      <div>
          <NavBar/>
          <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="login" element={<SignIn/>}/>
            <Route path="register" element={<SignUp/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="addcar" element={<AddCars/>}/>
            <Route path="cars" element={<Cars/>}/>
            <Route path="updatecar/:id" element={<UpdateCar/>}/>
            <Route path="drivers" element={<Drivers/>}/>
            <Route path="adddriver" element={<AddDriver/>}/>
            <Route path="updatedriver/:id" element={<UpdateDriver/>}/>
            <Route path="company" element={<Company/>}/>
            <Route path="addcompany" element={<AddCompany/>}/>
            <Route path="updatecompany/:id" element={<UpdateCompany/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="updateuser/:id" element={<UpdateUser/>}/>
          </Routes>
      </div>
  );
}

export default App;
