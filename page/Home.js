import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Dashboard from "../components/Dashboard";
import { VirtualizedList } from "react-native";

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
  const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
    stocks: Math.floor(Math.random() * 100),
  });

  const getItemCount = (_data) => 50;

  const Item = ({ title, stocks }) => (
    <View className="flex-row justify-between items-center w-full bg-red-300 h-12 my-1 px-1">
        <Text>{title}</Text>
        <Text>Stocks: {stocks}</Text>
        <Text>Sold: {stocks}</Text>
        <Text>Total: {stocks}</Text>
        <Button title="Edit" />
    </View>
  );
  return (
    <View className="flex-column justify-center items-center">
      <View className="flex-row bg-[#246EE9] h-10 w-[100%] justify-center items-center">
        <Text className="text-white font-bold text-lg">My Inventory</Text>
      </View>
      <Dashboard />
      <View className="bg-red-500 w-full">
        <Button title="Add Product" />
      </View>
      <VirtualizedList
        style={{
          width: "100%",
          marginVertical: 10,
          marginHorizontal: 20,
        }}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} stocks={item.stocks} />}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
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
