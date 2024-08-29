import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {AppContextType, LocationContext} from '../src/context/LocationContext';
import {LocationProvider} from '../src/context/LocationProvider';

// Properly type the ui parameter and the providerProps
export const renderWithContext = ui => {
  return mount(<LocationProvider>{ui}</LocationProvider>);
};
