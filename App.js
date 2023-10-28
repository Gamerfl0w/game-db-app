import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from 'react-native';

import Home from './components/Home';
import useFetch from "./components/useFetch";

const App = () => {
  const { data, isLoading, error } = useFetch('https://api.rawg.io/api/creators');
  console.log(data);

  return(
    <SafeAreaView className="flex flex-1 bg-[#221f1f]">
      <Home />
    </SafeAreaView>
  )
 
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default App;