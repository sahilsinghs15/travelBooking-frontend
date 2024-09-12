import { useState } from 'react';
import { useAppDispatch } from '../Helpers/Hooks';
import { createBooking, TravelerDetails } from '../Redux/Slices/travelBookingSlice.reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const TravelBookingPage = () => {
  const dispatch = useAppDispatch();
  const { packages } = useSelector((state: RootState) => state.travelPackages);
  const [travelPackageId, setTravelPackageId] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelerDetails, setTravelerDetails] = useState<TravelerDetails[]>([{ name: '', age: 0, gender: 'male' }]);
  const [totalTravelers, setTotalTravelers] = useState(1);

  const handleTravelerDetailChange = (index: number, field: string, value: any) => {
    const updatedDetails = [...travelerDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setTravelerDetails(updatedDetails);
  };

  const handleAddTraveler = () => {
    setTravelerDetails([...travelerDetails, { name: '', age: 0, gender: 'male' }]);
    setTotalTravelers(totalTravelers + 1);
  };

  const handleRemoveTraveler = (index: number) => {
    const updatedDetails = travelerDetails.filter((_, i) => i !== index);
    setTravelerDetails(updatedDetails);
    setTotalTravelers(totalTravelers - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createBooking({
        travelPackageId,
        travelDate,
        travelerDetails,
        totalTravelers,
      })
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Travel Package</h1>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Select Travel Package</label>
            <select
              value={travelPackageId}
              onChange={(e) => setTravelPackageId(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Select Package --</option>
              {packages?.map((pkg: any) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.title} - {pkg.destination}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Travel Date</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Traveler Details</h2>
            {travelerDetails.map((traveler, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Traveler {index + 1}</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={traveler.name}
                  onChange={(e) => handleTravelerDetailChange(index, 'name', e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={traveler.age}
                  onChange={(e) => handleTravelerDetailChange(index, 'age', e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={traveler.gender}
                  onChange={(e) => handleTravelerDetailChange(index, 'gender', e.target.value as 'male' | 'female' | 'other')}
                  className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTraveler(index)}
                    className="text-red-500 mt-2"
                  >
                    Remove Traveler
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <button
              type="button"
              onClick={handleAddTraveler}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Traveler
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelBookingPage;
