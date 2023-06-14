import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const AddProduct = () => {
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
  if (hasPermission === null) {
    return <View className="flex-1 bg-red-500"></View>;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400, marginTop: 10}}
      />
      {!hasPermission && (
        <Text className="text-green-500">Requesting for camera permission</Text>
      )}
      <Text>{text}</Text>
      {scanned && (
        <Button
          title={"Add Product"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
    </View>
  );
};

export default AddProduct;
