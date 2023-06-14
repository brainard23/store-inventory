import { SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddProduct from "./screens/AddProduct";
import Dashboard from "./screens/Dashboard";
import GlobalStyles from "./GlobalStyles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Add Product" component={AddProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
