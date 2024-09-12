import { Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage.tsx';
import Signup from "./Pages/Signup.tsx";
import Login from "./Pages/Login.tsx";
import Denied from "./Pages/Denied.tsx";
import NotFound from "./Pages/NotFound.tsx";
import Aboutus from "./Pages/Aboutus.tsx";
import TravelPackagesPage from "./Components/TravelPackagesPage.tsx";
import TravelPackageDetailsPage from "./Components/TravelPackageDetailsPage.tsx";
import SearchResultsPage from "./Components/SearchResultsPage.tsx";
import ProfilePage from "./Components/ProfilePage.tsx";
import TravelBookingPage from "./Components/TravelBookingPage.tsx";


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
