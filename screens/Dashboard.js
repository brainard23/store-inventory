import { Text, View, Button } from "react-native";
import SummaryReports from "../components/SummaryReports";
import { VirtualizedList } from "react-native";

const Dashboard = ({ navigation }) => {

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
      <SummaryReports />
      <View className="bg-red-500 w-full">
        <Button title="Add Product" onPress={() => navigation.navigate('Add Product')}/>
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

   
  );
};

export default Dashboard;
