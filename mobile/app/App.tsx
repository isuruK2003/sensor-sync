import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/Home";
import StreamScreen from "./screens/Stream";
import ChartScreen from "./screens/Chart";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import { createStackNavigator } from "@react-navigation/stack";

const HomeStackNavigator = createStackNavigator();
function HomeStack() {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
      <HomeStackNavigator.Screen name="Chart" component={ChartScreen} />
    </HomeStackNavigator.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
const BottomTabGroup = () => (
  <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, focused, size }) => {
        if (route.name === "Home") {
          return (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          );
        } else if (route.name === "Stream") {
          return (
            <Octicons
              name={focused ? "broadcast" : "broadcast"}
              size={size}
              color={color}
            />
          );
        } else if (route.name === "Plots") {
          return (
            <Ionicons
              name={focused ? "analytics" : "analytics-outline"}
              size={size}
              color={color}
            />
          );
        }
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#666',
    })}
  >
    <BottomTab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
    <BottomTab.Screen name="Stream" component={StreamScreen} />
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


