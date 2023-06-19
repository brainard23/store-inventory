import React, { useState, useEffect } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useForm, Controller } from "react-hook-form";
import hooks from "../src/hooks/AddProducts";

const AddProduct = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("Not yet scanned");
  const { mutate } = hooks.useAddProducts();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      barcode: barcode,
      name: "",
      brand: "",
      quantity: "",
      price: "0",
    },
  });
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const onSubmit = (data) => {
    data.barcode = barcode;
    data.id = barcode;
    mutate(data);
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setBarcode(data);
  };

  // Check permissions and return the screens
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
        style={{ height: 400, width: 400, marginTop: 10 }}
      />
      {!hasPermission && (
        <Text className="text-green-500">Requesting for camera permission</Text>
      )}
      <ScrollView>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="m-2 h-14 border-2 border-gray-300 rounded-md px-4 py-2 text-lg"
              editable={false}
              placeholder="barcode"
              onBlur={onBlur}
              onChangeText={onChange}
              value={barcode}
            />
          )}
          name="barcode"
        />
        {errors.barcode && (
          <Text className="m-2 text-red-500">This is required.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="m-2 h-14 border-2 border-gray-300 rounded-md px-4 py-2 text-lg"
              placeholder="Name"
              type="number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text className="m-2 text-red-500">This is required.</Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="m-2 h-14 border-2 border-gray-300 rounded-md px-4 py-2 text-lg"
              placeholder="Brand"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="brand"
        />
        {errors.brand && (
          <Text className="m-2 text-red-500">This is required.</Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="m-2 h-14 border-2 border-gray-300 rounded-md px-4 py-2 text-lg"
              number
              keyboardType="numeric"
              placeholder="Quantity"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="quantity"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="relative">
              <Text className="flex-row justify-center items-center absolute m-2 h-14 rounded-md px-4 py-3 text-lg">
                ₱
              </Text>
              <TextInput
                className="m-2 h-14 border-2 border-gray-300 rounded-md px-12 py-3 text-lg"
                number
                keyboardType="numeric"
                placeholder="Price"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="price"
        />
      </ScrollView>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      {/* {scanned && (
        <Button
          title={"Add Product"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )} */}
    </View>
  );
};

export default AddProduct;
