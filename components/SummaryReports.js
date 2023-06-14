import { Text, View } from "react-native";

const SummaryReports = () => {
  return (
    <View className="w-full h-40">
      <View className="flex-row justify-center items-center p-2">
        <Text className="font-bold text-lg">Reports</Text>
      </View>
      <View className="flex-row justify-between items-center mx-2 border rounded-sm	p-5">
        <View className="flex-column items-left w-[50%]">
          <Text>Total Items: 12 </Text>
          <Text>Total Sold Items: 51</Text>
          <Text>Profit: Php 1000</Text>
        </View>
        <View className="flex-column items-left w-[50%]">
            <Text>Out of Stocks</Text>
            <Text>Out of Stocks</Text>
            <Text>Out of Stocks</Text>
        </View>
      </View>
    </View>
  );
};

export default SummaryReports;
