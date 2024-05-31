
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/login/UserLogin";
import UserHome from "./pages/user/home/UserHome";
import UserRegister from "./pages/user/signup/UserRegister";
import Profile from "./pages/user/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";
import AdminDashboard from "./pages/Admin/dashboard/AdminDashboard";
import ListUser from "./pages/Admin/userList/ListUser";
import EditUser from "./pages/Admin/useredit/EditUser";
import Adduser from "./pages/Admin/AddUser/Adduser";





function App() {
  return (
    <Router>
        <Routes>
        <Route path="/home" element={<UserHome/>}/>
          <Route path="/" element={<UserLogin/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/signup" element={<UserRegister/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/dashboard" element={<AdminDashboard />}/>
          <Route path="/userlist" element={<ListUser />}/>
          <Route path="/edituser" element={<EditUser />}/>
          <Route path="/adduser" element={<Adduser />}/>

        </Routes>
    </Router>
  );
}

export default App;
