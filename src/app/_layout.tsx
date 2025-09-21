import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import QueryClientContext from "../context/query-client.context";

export default function RootLayout() {
  return (
    <QueryClientContext>
      <RootNavigator />
    </QueryClientContext>
  );
}

function RootNavigator() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: "#FF8C00",
      },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#FFF",
          title: "Filmes",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          )
        }} 
      />
      <Tabs.Screen 
        name="schedules" 
        options={{ 
          headerShown: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#FFF",
          title: "Agendamentos",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" color={color} size={size} />
          )
        }} 
      />
      <Tabs.Screen 
        name="schedule-add" 
        options={{ 
          headerShown: false,
          href: null,
          tabBarStyle: {
            display: 'none',
          },
        }} 
      />
    </Tabs>
  );
}
