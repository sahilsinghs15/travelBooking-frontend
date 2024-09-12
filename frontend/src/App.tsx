import { Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Denied from "./Pages/Denied";
import NotFound from "./Pages/NotFound";
import Aboutus from "./Pages/Aboutus";
import TravelPackagesPage from "./Components/TravelPackagesPage";
import TravelPackageDetailsPage from "./Components/TravelPackageDetailsPage";
import SearchResultsPage from "./Components/SearchResultsPage";
import ProfilePage from "./Components/ProfilePage";
import TravelBookingPage from "./Components/TravelBookingPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/travel-packages" element={<TravelPackagesPage />} />
        <Route path="/travel-packages/searchTravelPackage" element={<SearchResultsPage />} /> 
        <Route path="/travel-packages/:package_id" element={<TravelPackageDetailsPage />} />
        <Route path="/booking/:package_id" element={<TravelBookingPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
