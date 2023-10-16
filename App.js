import React, {useState, useEffect} from 'react';
import { NativeWindStyleSheet } from "nativewind";

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import {API_KEY, NAGIO} from '@env'


const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.rawg.io/api/games?key=' + API_KEY,
        )
        setData(response.data.results)
        console.log(data)
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };

    fetchData();
    
  }, []);

  // useEffect(() => {
  //   setData([
  //     { name: 'GAME NAME', id: '1' },
  //     { name: 'Nagio', id: '2' },
  //     { name: 'PARANORMASIGHT', id: '3' }]);
  // }, []);

  // dont forget to put error handling
  // make this responsive
  return(

    <View className="flex flex-1 h-full w-full flex-col justify-center items-center bg-[#221f1f]">
      <Text className="text-center text-4xl mb-10 text-white">All Games</Text>
      <View className="flex justify-center items-center gap-10 w-full flex-wrap">
      <FlatList
      numColumns={2} 
      data={data}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={({index, item}) => (

          <View className="border-2 border-[#2e3233] rounded-xl bg-[#26324a] max-w-[170px]" style={{marginRight: index % 2 !== 0 ? 0 : 10}}>
            <ImageBackground imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} 
              className="relative w-[170px] h-[150px] bg-center bg-cover" 
              source={{ uri: NAGIO }}>
              <View className="absolute text-center top-1 right-1 p-2 h-[35px] w-[35px] bg-[#242726] rounded-full">
                <Text className="text-[11px] w-full text-white mt-[2px]">100</Text>
              </View>
            </ImageBackground>
            <View className="p-5">
              <Text className='text-white'>{item.name}</Text>
              <Text className='text-white'>Platforms Icon</Text>
            </View>
          </View>

      )}/>

      </View>
    </View>
  )
 
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default App;