import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store.ts";

export default function TravelPackageDetailsPage() {
  const { package_id } = useParams();
  const navigate = useNavigate();

  const travelPackage = useSelector((state: RootState) =>
    state.travelPackages.packages.find((pkg) => pkg.package_id === Number(package_id))
  );

  if (!travelPackage) return <p>Package not found</p>;

  const handleBookNow = () => {
    navigate(`/booking/${travelPackage.package_id}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{travelPackage.title}</h1>

      <img
        src={travelPackage.image_url}
        alt={travelPackage.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Package Details */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">{travelPackage.description}</p>
          <p><strong>Destination:</strong> {travelPackage.destination}</p>
          <p><strong>Duration:</strong> {travelPackage.duration} days</p>
          <p><strong>Price:</strong> ${travelPackage.price}</p>
          <p><strong>Ratings:</strong> {travelPackage.ratings} stars</p>
          <p><strong>Start Date:</strong> {travelPackage.startDate}</p>
          <p><strong>End Date:</strong> {travelPackage.endDate}</p>
        </div>

        {/* Inclusions and Exclusions */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
          <ul className="list-disc pl-6">
            {travelPackage.inclusions.map((inclusion, index) => (
              <li key={index}>{inclusion}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">What's Excluded</h2>
          <ul className="list-disc pl-6">
            {travelPackage.exclusions.map((exclusion, index) => (
              <li key={index}>{exclusion}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
        <div className="space-y-4">
          {travelPackage.itinerary.map((day, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-xl font-semibold">Day {day.day}</h3>
              <p>{day.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Book Now Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleBookNow}
          className="bg-primary text-white px-6 py-3 rounded-lg text-xl"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
