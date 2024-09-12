import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { fetchTravelPackages } from "../Redux/Slices/travelPackageSlice.reducer"; 
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../Helpers/Hooks";
import Footer from "./Footer";

export default function TravelPackagesPage() {
  const dispatch = useAppDispatch();
  const { packages, loading, error } = useSelector((state: RootState) => state.travelPackages);

  useEffect(() => {
    dispatch(fetchTravelPackages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">TravelSearch</h1>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <Link to="/travel-packages" className="hover:text-yellow-400">Destinations</Link>
            <Link to="/aboutus" className="hover:text-yellow-400">About</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-5xl font-bold mb-8 text-center text-blue-800">Destinations</h2>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error loading packages: {error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages && packages.map((travelPackage) => (
                <Link to={`/travel-packages/${travelPackage.package_id}`} key={travelPackage.package_id}>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
                    <img src={travelPackage.image_url} alt={travelPackage.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{travelPackage.title}</h3>
                      <p className="text-gray-600 mb-4">{travelPackage.duration} days</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-600">{travelPackage.price} rs</span>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-current h-5 w-5" />
                          <span className="ml-1 text-gray-700">{travelPackage.ratings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer/>
    </div>
  );
}
