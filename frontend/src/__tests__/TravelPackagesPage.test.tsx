import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../Redux/store';
import TravelPackagesPage from '../Components/TravelPackagesPage'; 
import { BrowserRouter } from 'react-router-dom'; 
import { fetchTravelPackages } from '../Redux/Slices/travelPackageSlice.reducer';

// Mocking the travel packages
const mockPackages = [
  {
  "title": "Thai Paradise Adventure",
  "image_url": "https://skift.com/wp-content/uploads/2020/04/AdobeStock_73449188-scaled-e1587704379633.jpeg",
  "destination": "Bangkok, Chiang Mai, Phuket, Thailand",
  "price": 35000, 
  "duration": "10 Days / 11 Nights",
  "ratings": 4.9, 
  "description": "Relax on the beaches and explore the vibrant cities of Thailand.",
  "start_date": "2025-10-01", 
  "end_date": "2025-10-11", 
  "itinerary": [
    {
      "day": 1,
      "description": "Arrive in Bangkok, explore the Grand Palace and Wat Pho."
    },
    {
      "day": 2,
      "description": "Visit Chinatown and Wat Arun."
    },
    {
      "day": 3,
      "description": "Take a day trip to Ayutthaya."
    },
    {
      "day": 4,
      "description": "Fly to Chiang Mai, visit Wat Phra Singh."
    },
    {
      "day": 5,
      "description": "Explore the Old City and night markets."
    },
    {
      "day": 6,
      "description": "Day trip to Doi Inthanon National Park."
    }
    
  ],
  "inclusions": [
    "Flight tickets",
    "Accommodation",
    "Daily breakfast",
    "Guided tours as per itinerary"
  ],
  "exclusions": [
    "International airport transfers",
    "Travel insurance",
    "Meals other than breakfast",
    "Personal expenses"
  ]
},
  {
  "title": "Unforgettable Uganda Adventure",
  "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlsMRslLSDZF4wJtxAEIEZTLORzCXsoM2tnA&s",
  "destination": "Entebbe, Bwindi Impenetrable Forest, Queen Elizabeth National Park, Kampala, Uganda",
  "price": 4200, 
  "duration": "8 Days / 7 Nights",
  "ratings": 4.8, 
  "description": "Experience the breathtaking wildlife and diverse landscapes of Uganda.",
  "start_date": "2025-11-15", 
  "end_date": "2025-11-22", 
  "itinerary": [
    {
      "day": 1,
      "description": "Arrive in Entebbe, transfer to Kampala and relax at the hotel."
    },
    {
      "day": 2,
      "description": "Drive to Bwindi Impenetrable Forest, prepare for gorilla trekking."
    },
    {
      "day": 3,
      "description": "Unforgettable experience Gorilla trekking in Bwindi Impenetrable Forest."
    },

    {
      "day": 4,
      "description": "Travel to Queen Elizabeth National Park, enjoy a game drive."
    },

    {
      "day": 5,
      "description": "Explore Queen Elizabeth National Park by boat and spot wildlife."
    },
    {
      "day": 6,
      "description": "Chimpanzee trekking in Kyambura Gorge (optional - add to inclusions if offered)."
    },
    {
      "day": 7,
      "description": "Drive back to Kampala, enjoy some souvenir shopping."
    },
    {
      "day": 8,
      "description": "Departure from Entebbe Airport."
    }
  ],
  "inclusions": [
    "Flight tickets (optional - adjust based on your offering)",
    "Accommodation",
    "Daily breakfast and dinner",
    "Transportation",
    "Park entrance fees",
    "Gorilla trekking permits",
    "Guided tours and game drives"
  ],
  "exclusions": [
    "International airport transfers",
    "Travel insurance",
    "Lunch (optional - adjust based on your offering)",
    "Drinks",
    "Personal expenses",
    "Optional activities (e.g., chimpanzee trekking)"
  ]
},
];

// Mocking Redux hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => ({
    packages: mockPackages,
    loading: false,
    error: null,
  })),
  useDispatch: () => jest.fn(),
}));

jest.mock('../Redux/Slices/travelPackageSlice.reducer', () => ({
  fetchTravelPackages: jest.fn(),
}));

describe('TravelPackagesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the loading state initially', () => {
    // Override the useSelector to simulate loading state
    jest.mock('react-redux', () => ({
      useSelector: () => ({
        packages: [],
        loading: true,
        error: null,
      }),
      useDispatch: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TravelPackagesPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders travel packages correctly when data is available', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TravelPackagesPage />
        </BrowserRouter>
      </Provider>
    );

    // Check if the page title is rendered
    expect(screen.getByText(/Destinations/i)).toBeInTheDocument();

    // Check if the packages are rendered
    const package1 = screen.getByText('Mountain Adventure');
    const package2 = screen.getByText('Beach Escape');

    expect(package1).toBeInTheDocument();
    expect(package2).toBeInTheDocument();
  });

  test('renders an error message if there is an error', () => {
    // Override the useSelector to simulate error state
    jest.mock('react-redux', () => ({
      useSelector: () => ({
        packages: [],
        loading: false,
        error: 'Error fetching packages',
      }),
      useDispatch: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TravelPackagesPage />
        </BrowserRouter>
      </Provider>
    );

    // Check if the error message is rendered
    expect(screen.getByText(/Error loading packages:/i)).toBeInTheDocument();
  });

  test('dispatches fetchTravelPackages on mount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TravelPackagesPage />
        </BrowserRouter>
      </Provider>
    );

    // Check if the fetchTravelPackages action was dispatched
    expect(fetchTravelPackages).toHaveBeenCalled();
  });
});
