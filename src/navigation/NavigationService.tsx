import { CommonActions } from "@react-navigation/native";
let _navigator : any;

//Setting top level navigator from App.js
function setTopLevelNavigator(navigatorRef: any) {
    _navigator = navigatorRef
}

//Navigate to a particular screen
//params -> (Name of screen, parameters)
function navigate(routeName: string, params: any = {}) {
    _navigator.dispatch(
        CommonActions.navigate({
          name: routeName,
          params
        })
      );
}

function reset(routeName: string, params: any) {
    _navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: routeName }],
        })
    );
}

function back() {
    _navigator.dispatch(
        CommonActions.goBack()
    );
}

export default {
    navigate,
    setTopLevelNavigator,
    reset,
    back
};