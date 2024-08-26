import * as React from "react";
import { mount, shallow } from "enzyme";
import SearchScreen from "../../../src/screens/SearchScreen";
import { LocationContext } from '../../../src/context/LocationContext';
import { renderWithContext } from "../../mountWithContext";
import { toJson} from "enzyme-to-json"
import { WeatherService } from "../../../src/api/WeatherService";
import { act } from 'react-dom/test-utils';
import NavigationService from "../../../src/navigation/NavigationService";
let wrapper;

const defaultProps = {
    location : {
        id: 1,
        name: "Chandigarh",
        latitude: 30.7333,
        longitude: 76.7794,
        country: "India"
      },
      setLocation : jest.fn()
}
afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
})
jest.mock('../../../src/api/WeatherService');

describe("<SearchScreen/> Unit test cases using fully mounted SearchScreen Component", ()=> {

    it("<SearchScreen/> generate snapshot", ()=> {
        wrapper = renderWithContext(<SearchScreen/>);
        expect(wrapper).toMatchSnapshot();
    })

    it("<SearchScreen/> render without crashing", ()=> {
        wrapper = renderWithContext(<SearchScreen/>);
        expect(wrapper).toBeTruthy();
    })

    const mockWeatherService = WeatherService ;
    const mockResults = [
        {
            id: 2,
            name: "Delhi",
            latitude: 28.7041,
            longitude: 77.1025,
            country: "India"
          }
    ]
    beforeEach(() => {
        jest.clearAllMocks();
        mockWeatherService.getSearchList.mockResolvedValue(mockResults);
      });
    it("<SearchScreen/> handle onSearch", async ()=> {
        
        wrapper = renderWithContext(<SearchScreen/>);
        const searchInput = wrapper.find({testID: "searchInput"}).first();
        searchInput.props().onChangeText("Delhi");
        wrapper.setProps({});
        wrapper.update();
        const searchInputUpdated = wrapper.find({testID: "searchInput"}).first();
        expect(searchInputUpdated.props().value).toBe("Delhi");
       
        const searchBtn = wrapper.find({testID: "searchBtn"}).first();
        searchBtn.props().onPress();
        
        await act(async () => {
            // Wait for any promises to resolve
            await Promise.resolve();
            wrapper.setProps({})
            wrapper.update();
          });
        const locationList = wrapper.find({testID: "locationList"}).first();
        expect(locationList.props().data).toHaveLength(1);
    })

    it("<SearchScreen/> handle flatlist click", async ()=> {
        NavigationService.back = jest.fn();
        wrapper = renderWithContext(<SearchScreen/>);
        const searchInput = wrapper.find({testID: "searchInput"}).first();
        searchInput.props().onChangeText("Delhi");
        wrapper.setProps({});
        wrapper.update();
       
        const searchBtn = wrapper.find({testID: "searchBtn"}).first();
        searchBtn.props().onPress();
        
        await act(async () => {
            // Wait for any promises to resolve
            await Promise.resolve();
            wrapper.setProps({})
            wrapper.update();
          });
        const locationList = wrapper.find({testID: "locationList"}).first();
        const renderItem = renderWithContext(locationList.props().renderItem({item : mockResults[0]}))
        expect(renderItem).toBeTruthy();
        
        const locationName = renderItem.find({testID: "locationItem"}).first();
        locationName.props().onPress();
        expect(NavigationService.back).toHaveBeenCalledTimes(1);
    })
})