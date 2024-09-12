import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Footer from "./Footer";

export default function TravelPackageDetailsPage() {
  const { package_id } = useParams();
  const navigate = useNavigate();

  const travelPackage = useSelector((state: RootState) =>
    state.travelPackages.packages.find((pkg) => pkg.package_id === Number(package_id))
  );

  if (!travelPackage) return <p className="text-center text-red-500">Package not found</p>;

  const handleBookNow = () => {
    navigate(`/booking/${package_id}`);
  };

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
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6 text-blue-800">{travelPackage.title}</h1>

          <img
            src={travelPackage.image_url}
            alt={travelPackage.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Package Details */}
            <div className="bg-white shadow-md p-8 rounded-lg">
              <h2 className="text-3xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-700 mb-4">{travelPackage.description}</p>
              <p><strong>Destination:</strong> {travelPackage.destination}</p>
              <p><strong>Duration:</strong> {travelPackage.duration} days</p>
              <p><strong>Price:</strong> {travelPackage.price} rs</p>
              <p><strong>Ratings:</strong> {travelPackage.ratings} stars</p>
              <p><strong>Start Date:</strong> {travelPackage.startDate}</p>
              <p><strong>End Date:</strong> {travelPackage.endDate}</p>
            </div>

            {/* Inclusions and Exclusions */}
            <div className="bg-white shadow-md p-8 rounded-lg">
              <h2 className="text-3xl font-semibold mb-4">What's Included</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {travelPackage.inclusions.map((inclusion, index) => (
                  <li key={index}>{inclusion}</li>
                ))}
              </ul>

              <h2 className="text-3xl font-semibold mt-6 mb-4">What's Excluded</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {travelPackage.exclusions.map((exclusion, index) => (
                  <li key={index}>{exclusion}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white shadow-md p-8 rounded-lg mt-8">
            <h2 className="text-3xl font-semibold mb-4">Itinerary</h2>
            <div className="space-y-6">
              {travelPackage.itinerary.map((day, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="text-xl font-semibold">Day {day.day}</h3>
                  <p className="text-gray-700">{day.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Book Now Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBookNow}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
