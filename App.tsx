import React, {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import HomeNavigator from "./src/navigation/HomeNavigator";
import NoInternet from "./src/components/NoInternet";

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | unknown>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(currentState => {
      setIsConnected(currentState?.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return !isConnected ? <NoInternet /> : <HomeNavigator />;
}
