import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Chart from "./screens/Chart";

import { Icon } from './fragments/icon';
import { createStackNavigator } from "@react-navigation/stack";

const HomeStackNavigator = createStackNavigator();
function HomeStack() {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen name="Home" component={Home} />
      <HomeStackNavigator.Screen name="Chart" component={Chart} />
    </HomeStackNavigator.Navigator>
  );
}

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
    <BottomTab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
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


