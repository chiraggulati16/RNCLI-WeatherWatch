import {configure} from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({adapter: new Adapter()});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigationState: () => ({
      state: {
        routes: null,
      },
    }),
    useRoute: jest.fn(),
    useIsFocused: jest.fn(),
  };
});

jest.mock('axios', () => {
  return {
    create: () => {
      return {
        interceptors: {
          request: {eject: jest.fn(), use: jest.fn()},
          response: {eject: jest.fn(), use: jest.fn()},
        },
        get: jest.fn(),
      };
    },
  };
});

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  //log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  // warn: jest.fn(),
  error: jest.fn(),
};
