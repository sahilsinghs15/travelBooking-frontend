import { useSelector } from "react-redux";
import { searchTravelPackages, setFilters } from "../Redux/Slices/travelPackageSlice.reducer";
import { Star,Search } from "lucide-react";
import { RootState } from "../Redux/store";
import Footer from "../Components/Footer";
import { useAppDispatch } from "../Helpers/Hooks";
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filters } = useSelector((state: RootState) => state.travelPackages);

  const handleSearch = () => {
    dispatch(searchTravelPackages({ filters }));
    navigate("/travel-packages/searchTravelPackage");
  };

  const updateFilter = (field: keyof typeof filters, value: any) => {
    dispatch(setFilters({ ...filters, [field]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">TravelSearch</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-primary">Home</a></li>
              <li><Link to="/travel-packages" className="text-gray-600 hover:text-primary">Destinations</Link></li>
              <li><Link to="/aboutus" className="text-gray-600 hover:text-primary">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-primary py-20 text-black font-bold">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Find Your Perfect Travel Package</h1>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-wrap -mx-3 mb-4">
                {/* Destination Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                  <label>Enter Your Destination</label>
                  <input
                    type="text"
                    placeholder="Destination"
                    value={filters.destination}
                    onChange={(e) => updateFilter("destination", e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Start Date Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={filters.startDate ? new Date(filters.startDate).toISOString().split("T")[0] : ""}
                    onChange={(e) => updateFilter("startDate", new Date(e.target.value).getTime())}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* End Date Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={filters.endDate ? new Date(filters.endDate).toISOString().split("T")[0] : ""}
                    onChange={(e) => updateFilter("endDate", new Date(e.target.value).getTime())}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Min Price Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                  <label>Min Price</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter("minPrice", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Max Price Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                  <label>Max Price</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter("maxPrice", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Min Rating Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                
                  <div className=" flex">
                    <label>Min Rating </label>
                    <Star/>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={filters.minRating}
                    onChange={(e) => updateFilter("minRating", parseFloat(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Max Rating Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                
                  <div className=" flex">
                    <label>Max Rating </label>
                    <Star/>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={filters.maxRating}
                    onChange={(e) => updateFilter("maxRating", parseFloat(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Min Duration Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                  <label>Min Duration (Days)</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.minDuration}
                    onChange={(e) => updateFilter("minDuration", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                {/* Max Duration Filter */}
                <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                  <label>Max Duration (Days)</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.maxDuration}
                    onChange={(e) => updateFilter("maxDuration", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
                  onClick={handleSearch}
                >
                  <Search className="mr-2" />
                  Search Packages
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
