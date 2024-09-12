import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { fetchTravelPackages } from "../Redux/Slices/travelPackageSlice.reducer"; 
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../Helpers/Hooks";

export default function TravelPackagesPage() {
  const dispatch = useAppDispatch(); // Dispatch to call thunks
  const { packages, loading, error } = useSelector((state: RootState) => state.travelPackages);

  useEffect(() => {
    dispatch(fetchTravelPackages());
  }, [dispatch]); // Remove `packages` from dependency array

  // You can log outside of useEffect to see updated state
  console.log("Packages from state: ", packages);

  return (
    <div className="container mx-auto px-4 py-12">
        <h2 className="flex text-5xl font-bold justify-center">Destinations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading packages: {error}</p> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {packages && packages.map((travelPackage) => (
            <Link to={`/travel-packages/${travelPackage.package_id}`} key={travelPackage.package_id}>
              <div className="border rounded-lg shadow-lg overflow-hidden">
                <img src={travelPackage.image_url} alt={travelPackage.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{travelPackage.title}</h3>
                  <p className="text-gray-600 mb-4">{travelPackage.duration} days</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">${travelPackage.price}</span>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current h-4 w-4" />
                      <span className="ml-1">{travelPackage.ratings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
