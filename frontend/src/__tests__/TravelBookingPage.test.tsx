import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../Redux/store';
import TravelBookingPage from '../Components/TravelBookingPage'; 

// Mock initial state for packages
const mockPackages = [
  {
    title: "Thai Paradise Adventure",
    image_url: "https://skift.com/wp-content/uploads/2020/04/AdobeStock_73449188-scaled-e1587704379633.jpeg",
    destination: "Bangkok, Chiang Mai, Phuket, Thailand",
    price: 35000, 
    duration: "10 Days / 11 Nights",
    ratings: 4.9,
    description: "Relax on the beaches and explore the vibrant cities of Thailand.",
    start_date: "2025-10-01", 
    end_date: "2025-10-11", 
    itinerary: [
      { day: 1, description: "Arrive in Bangkok, explore the Grand Palace and Wat Pho." },
      { day: 2, description: "Visit Chinatown and Wat Arun." },
      { day: 3, description: "Take a day trip to Ayutthaya." },
      { day: 4, description: "Fly to Chiang Mai, visit Wat Phra Singh." },
      { day: 5, description: "Explore the Old City and night markets." },
      { day: 6, description: "Day trip to Doi Inthanon National Park." }
    ],
    inclusions: [
      "Flight tickets",
      "Accommodation",
      "Daily breakfast",
      "Guided tours as per itinerary"
    ],
    exclusions: [
      "International airport transfers",
      "Travel insurance",
      "Meals other than breakfast",
      "Personal expenses"
    ]
  }
];

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({ packages: mockPackages }),
  useDispatch: () => jest.fn(),
}));

describe('TravelBookingPage', () => {
  test('renders the booking form', () => {
    render(
      <Provider store={store}>
        <TravelBookingPage />
      </Provider>
    );

    expect(screen.getByLabelText(/Select Travel Package/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Travel Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Traveler Details/i)).toBeInTheDocument();
  });

  test('can select a travel package and enter traveler details', () => {
    render(
      <Provider store={store}>
        <TravelBookingPage />
      </Provider>
    );

    const packageSelect = screen.getByLabelText(/Select Travel Package/i) as HTMLSelectElement;
    expect(packageSelect.options).toHaveLength(2); // Ensure there are options available
    fireEvent.change(packageSelect, { target: { value: mockPackages[0].title } });
    expect(packageSelect.value).toBe(mockPackages[0].title);

    const nameInput = screen.getByPlaceholderText(/Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const ageInput = screen.getByPlaceholderText(/Age/i) as HTMLInputElement;
    fireEvent.change(ageInput, { target: { value: '30' } });
    expect(ageInput.value).toBe('30');
  });

  test('adds and removes travelers', () => {
    render(
      <Provider store={store}>
        <TravelBookingPage />
      </Provider>
    );

    const addButton = screen.getByText(/Add Traveler/i);
    fireEvent.click(addButton);

    // Check if another traveler input is added
    const travelerInputs = screen.getAllByPlaceholderText(/Name/i);
    expect(travelerInputs.length).toBeGreaterThan(1);

    const removeButton = screen.getByText(/Remove Traveler/i);
    fireEvent.click(removeButton);

    // Check if traveler input is removed
    expect(screen.getAllByPlaceholderText(/Name/i).length).toBe(1);
  });
});
