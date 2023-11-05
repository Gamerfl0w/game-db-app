import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import useFetch from "./components/useFetch";
import GameDetails from "./components/GameDetails";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex justify-center items-center flex-1 bg-[#221f1f]">
      <Home />
    </SafeAreaView>
  );
}

function DetailsScreen({route}) {
  const { id } = route.params;

  return (
    <SafeAreaView className="bg-[#221f1f]">
      <GameDetails id={JSON.stringify(id)} />
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

export default App;