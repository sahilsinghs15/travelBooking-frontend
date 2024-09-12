import { Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './Pages/Homepage.tsx';
import Signup from "./Pages/Signup.tsx";
import Login from "./Pages/Login.tsx";
import Denied from "./Pages/Denied.tsx";
import NotFound from "./Pages/NotFound.tsx";
import Aboutus from "./Pages/Aboutus.tsx";
import TravelPackagesPage from "./Components/TravelPackagesPage.tsx";
import TravelPackageDetailsPage from "./Components/TravelPackageDetailsPage.tsx";
import SearchResultsPage from "./Components/SearchResultsPage.tsx"; // Import new Search page

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/travel-packages" element={<TravelPackagesPage />} />
        <Route path="/travel-packages/searchTravelPackage?" element={<SearchResultsPage />} /> {/* Add search results page */}
        <Route path="/travel-packages/:package_id" element={<TravelPackageDetailsPage />} /> {/* Dynamic package details */}
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
