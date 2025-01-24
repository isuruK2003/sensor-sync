import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Settings from "./screens/Settings";

import { Icon } from './fragments/dynamic-icon';

const BottomTab = createBottomTabNavigator();
const BottomTabGroup = () => (
  <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, focused, size }) => {
        let iconName;
        let iconLib = "ionicon";

        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "cog" : "cog-outline";
        } else if (route.name === "Plots") {
          iconName = focused ? "analytics" : "analytics-outline";
        }
        return <Icon name={iconName} type={iconLib} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#666',
    })}
  >
    <BottomTab.Screen name="Home" component={Home} />
    <BottomTab.Screen name="Settings" component={Settings} />
  </BottomTab.Navigator>
);

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <BottomTabGroup />
      </NavigationContainer>
    </SafeAreaView>
  );
}


