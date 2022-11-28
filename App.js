import HomeScreen from "./pages/HomeScreen";
import UpcomingScreen from "./pages/UpcomingScreen";
import ProfileScreen from "./pages/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Assets,
  View,
  Icon,
  Text,
  Slider,
  Switch,
  GradientSlider,
} from "react-native-ui-lib";
import "react-native-gesture-handler";

Assets.loadAssetsGroup("icons", {
  scoreboard: require("./assets/ranking-star-solid.png"),
  upcoming: require("./assets/calendar-days-solid.png"),
  about: require("./assets/flag-regular.png"),
});

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Scoreboard"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                margin-30
                size={size}
                tintColor={color}
                source={Assets.icons.scoreboard}
              />
            ),
          }}
          component={HomeScreen}
        />
        <BottomTab.Screen
          name="Upcoming"
          component={UpcomingScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon
                margin-30
                size={size}
                tintColor={color}
                source={Assets.icons.upcoming}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="About"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                margin-30
                size={size}
                tintColor={color}
                source={Assets.icons.about}
              />
            ),
          }}
         />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
