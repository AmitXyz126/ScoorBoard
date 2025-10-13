import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Login from "../screens/Login";
import EnterScreen from "../screens/EnterScreen";
import SelectSportScreen from "../screens/SelectSportScreen";
import SelectMatchScreen from "../screens/SelectMatchScreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Login" component={EnterScreen} />
        <Stack.Screen name="LoginPage" component={Login} />

        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SelectSport" component={SelectSportScreen} />
        <Stack.Screen name="SelectMatchScreen" component={SelectMatchScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
