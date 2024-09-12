import { useSelector } from "react-redux";
import { searchTravelPackages, setFilters } from "../Redux/Slices/travelPackageSlice.reducer";
import { Star, Search, User, LogIn, LogOut, UserPlus, ChevronDown, Menu } from "lucide-react";
import { RootState } from "../Redux/store";
import Footer from "../Components/Footer";
import { useAppDispatch } from "../Helpers/Hooks";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/authSlice.reducer";
import { useState } from "react";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { filters } = useSelector((state: RootState) => state.travelPackages);
  const { isLoggedIn, data } = useSelector((state: RootState) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    dispatch(searchTravelPackages({ filters }));
    navigate("/travel-packages/searchTravelPackage");
  };

  const updateFilter = (field: keyof typeof filters, value: any) => {
    dispatch(setFilters({ ...filters, [field]: value }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold hidden md:block">TravelSearch</div>
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
          <nav className={`md:flex ${menuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link to="/travel-packages" className="hover:text-yellow-400">Destinations</Link></li>
              <li><Link to="/aboutus" className="hover:text-yellow-400">About</Link></li>
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link to="/signup" className="flex items-center hover:text-yellow-400">
                      <UserPlus className="mr-2" /> Signup
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="flex items-center hover:text-yellow-400">
                      <LogIn className="mr-2" /> Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="relative">
                  <button
                    className="flex items-center hover:text-yellow-400"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <User className="mr-2" />
                    <span>{data?.fullName}</span>
                    <ChevronDown className={`ml-2 transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2 z-10">
                      <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile{<User/>}</Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        <LogOut className="inline-block mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Search Filters Section */}
      <main className="flex-grow">
        <section className="bg-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-8 text-center">Find Your Perfect Travel Package</h1>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-wrap -mx-3 mb-6">
                {/* Destination Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Destination</label>
                  <input
                    type="text"
                    placeholder="Destination"
                    value={filters.destination}
                    onChange={(e) => updateFilter("destination", e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                  />
                </div>

                {/* Start Date Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Start Date</label>
                  <input
                    type="date"
                    value={filters.startDate ? new Date(filters.startDate).toISOString().split("T")[0] : ""}
                    onChange={(e) => updateFilter("startDate", new Date(e.target.value).getTime())}
                    className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                  />
                </div>

                {/* End Date Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">End Date</label>
                  <input
                    type="date"
                    value={filters.endDate ? new Date(filters.endDate).toISOString().split("T")[0] : ""}
                    onChange={(e) => updateFilter("endDate", new Date(e.target.value).getTime())}
                    className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                  />
                </div>

                {/* Min Price Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Min Price</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter("minPrice", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                  />
                </div>

                {/* Max Price Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Max Price</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter("maxPrice", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                  />
                </div>

                {/* Min Rating Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Min Rating</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={filters.minRating}
                      onChange={(e) => updateFilter("minRating", parseFloat(e.target.value))}
                      className="w-full border border-gray-300 p-3 rounded text-black font-semibold" 
                    />
                    <Star className="ml-2 text-yellow-400" />
                  </div>
                </div>

                {/* Max Rating Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Max Rating</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={filters.maxRating}
                      onChange={(e) => updateFilter("maxRating", parseFloat(e.target.value))}
                      className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                    />
                    <Star className="ml-2 text-yellow-400" />
                  </div>
                </div>

                {/* Min Duration Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Min Duration (Days)</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.minDuration}
                    onChange={(e) => updateFilter("minDuration", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                  />
                </div>

                {/* Max Duration Filter */}
                <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-4">
                  <label className="block text-gray-700 font-semibold">Max Duration (Days)</label>
                  <input
                    type="number"
                    min="0"
                    value={filters.maxDuration}
                    onChange={(e) => updateFilter("maxDuration", parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-3 rounded text-black font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-yellow-500 text-white px-6 py-3 rounded-md flex items-center shadow-md hover:bg-yellow-600"
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
