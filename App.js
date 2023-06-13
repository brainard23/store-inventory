import { SafeAreaView, StyleSheet, View } from "react-native";
import Homescreen from "./page/Home";
import GlobalStyles from "./GlobalStyles";

export default function App() {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Homescreen />
    </SafeAreaView>
  );
}
