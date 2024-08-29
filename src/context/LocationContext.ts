import React, {createContext, useContext} from 'react';
import {Location} from '../models/Location';

// Define a type for the context value
export type AppContextType = {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
};

// Create the context with a default value (optional)
export const LocationContext = createContext<AppContextType | undefined>(
  undefined,
);

// Custom hook to use the AppContext
export const useLocationContext = (): AppContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
