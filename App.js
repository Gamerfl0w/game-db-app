import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import useFetch from "./components/useFetch";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="bg-[#221f1f]">
      <Home />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </SafeAreaView>
  );
}

function DetailsScreen() {
  return (
    <SafeAreaView className="flex flex-1 bg-[#221f1f]">
      <Text className="text-white">Details Screen</Text>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  // const { data, isLoading, error } = useFetch('https://api.rawg.io/api/creators');
  // console.log(data);

  return(
    <NavigationContainer initialRouteName="All Games">
      <Stack.Navigator>
        <Stack.Screen name="All Games" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
 
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default App;