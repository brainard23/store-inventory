import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Dashboard from "../components/Dashboard";

const Homescreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  // Check permissions and return the screens
  //change later to null
  // if (hasPermission === true) {
  //   return (
  //     <View className="flex-1 bg-red-500">
  // <BarCodeScanner
  //   onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  //   style={{ height: 500, width: 500 }}
  // />;
  //       <Text className="text-green-500">Requesting for camera permission</Text>
  //     </View>)
  // }
  // if (hasPermission === false) {
  //   return (
  //     <View>
  //       <Text style={{ margin: 10 }}>No access to camera</Text>
  //       <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
  //     </View>)
  // }

  // Return the View
  return (
    <View className="flex-column justify-center items-center">
      <View className="flex-row bg-[#246EE9] h-10 w-[100%] justify-center items-center">
        <Text className="text-white font-bold text-lg">My Inventory</Text>
      </View>
      <Dashboard />
    </View>

    // {!scanned && (
    //   <Button
    //     title={"Add Product"}
    //     onPress={() => setScanned(false)}
    //     color="tomato"
    //   />
    // )}
  );
};

export default Homescreen;
