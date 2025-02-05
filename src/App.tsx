import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import AdminLogin from "./admin/loginpage";
import NoPermissionPage from "./admin/dontpermission";
import AdminDashboard from "./admin/admindashboard";
import ProductAddPage from "./admin/AddProduct";
import ContactPage from "./pages/contactus";
import AddTitle from "./admin/addtile";
import ProductPage from "./pages/productview";
import ProtectedRoutes from "./admin/protectedRoutes";
import Allproducts from "./pages/allproducts";
import AboutUs from "./pages/aboutus";
import PrivacyPolicy from "./pages/privacypolicy";
import UpdateBestseller from "./admin/components/hooks";
import BestSellerProducts from "./pages/bestseller";




function App() {

  return (
    <Router >
      <Routes>
        {/* this is for layout routes */}
        //
        <Route element = {<Layout/>} >
          <Route path="/" element={<Home />} />
          <Route path="/notallowed" element={<NoPermissionPage />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/productsview/:id" element={<ProductPage />} /> 
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/bestseller" element={<BestSellerProducts />} />
        </Route>
        
        {/* this is for non-layout routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/updatehook/:productid/:bestseller" element={<UpdateBestseller />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/admindashboard" element={<AdminDashboard />} /> 
        <Route path="/add-product" element={<ProductAddPage />} /> 
          <Route path="/addtitle" element={<AddTitle />} />
          
          </Route>
       
      </Routes>
   </Router>
  );
}

export default App
