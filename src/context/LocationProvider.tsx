import { ReactNode, useState } from "react";
import { LocationContext } from "./LocationContext";
import { Location } from "../models/Location";

interface MyProviderProps {
    children: ReactNode;
  }
  
  export const LocationProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<Location>({
        id: 1,
        name: "Chandigarh",
        latitude: 30.7333,
        longitude: 76.7794,
        country: "India"
      })
  
    return (
      <LocationContext.Provider value={{ location, setLocation }}>
        {children}
      </LocationContext.Provider>
    );
  };