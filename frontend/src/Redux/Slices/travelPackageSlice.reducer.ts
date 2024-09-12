import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast} from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance.ts';
import axios from 'axios';

// Define the initial state type for packages


export interface TravelPackage {
  package_id: number;
  image_url: string;
  title: string;
  destination: string;
  price: number;
  duration: number;
  ratings: number;
  description: string;
  startDate: string;
  endDate: string;
  inclusions : [string],
  exclusions : [string],
  itinerary : [
    {
      day : number ;
      description : string;
    }
  ]
}

interface TravelPackageState {
  packages: TravelPackage[];
  loading: boolean;
  error: string | null;
  filters: {
    destination: string;
    minPrice: number;
    maxPrice: number,
    minRating: number ,
    maxRating: number ;
    minDuration: number ;
    maxDuration: number ,
    startDate: Date | number | null ;
    endDate: Date | number | null ;
  };
}

const initialState: TravelPackageState = {
  packages: [],
  loading: false,
  error: null,
  filters: {
    destination: '',
    minPrice : 0,
    maxPrice : 50000,
    minRating : 0,
    maxRating: 5,
    minDuration: 0, 
    maxDuration : 15, 
    startDate: null,
    endDate: null,
  },
};

// Thunk for fetching all travel packages
export const fetchTravelPackages = createAsyncThunk(
  '/travel-packages',
  async (_, { rejectWithValue }) => {
    try {

      const response: any = await axios.get('http://localhost:5500/api/v1/travelPackage/');
      
      console.log("API Response", response?.data);
      
      toast.success("Travel Packages Loaded Successfully");

      return await response?.data.packages; // Return just the packages array
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to Fetch Travel Packages');
      return rejectWithValue('Failed to fetch travel packages');
    }
  }
);

// Thunk for searching travel packages
export const searchTravelPackages: any = createAsyncThunk(
  '/travel-packages/searchTravelPackage',
  async ({ filters }: TravelPackageState) => {
    try {
      const params = {
        destination: filters.destination,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minRating: filters.minRating,
        maxRating: filters.maxRating,
        minDuration : filters.minDuration,
        maxDuration: filters.maxDuration, 
      };

      const response: any = await axios.get('http://localhost:5500/api/v1/travelPackage/search',{params});
      return await response?.data.packages;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed To Search Travel Packages');
      return error?.response?.data;
    }
  }
);

// TravelPackage slice
const travelPackageSlice = createSlice({
  name: 'travelPackages',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchTravelPackages
    builder.addCase(fetchTravelPackages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTravelPackages.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null; // Clear any previous errors
      state.packages = action.payload;
    });
    builder.addCase(fetchTravelPackages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Handle searchTravelPackages
    builder.addCase(searchTravelPackages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchTravelPackages.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null; // Clear any previous errors
      state.packages = action.payload;
    });
    builder.addCase(searchTravelPackages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setFilters } = travelPackageSlice.actions;

export default travelPackageSlice.reducer;
