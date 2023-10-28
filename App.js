import React, {useState, useEffect} from 'react';
import { NativeWindStyleSheet } from "nativewind";

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Image
} from 'react-native';

import axios from 'axios';
import {API_KEY, NAGIO} from '@env'

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {height, width} = useWindowDimensions();
  let numColumns = 2;

  function responsiveCards(){
    width >= 640 ? numColumns = 3 : numColumns = 2;
  }

  //make this a reusable component
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.rawg.io/api/games?key=' + API_KEY,
        )
        setData(response.data.results)
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };
      fetchData();
  }, [width, responsiveCards()]);

  // useEffect(() => {
  //   setData([
  //     { name: 'GAME NAME', id: '1' },
  //     { name: 'Nagio', id: '2' },
  //     { name: 'PARANORMASIGHT', id: '3' }]);
  // }, [width, responsiveCards()]);

  // dont forget to put error handling
  // make this responsive
  // add readme(make it descriptive) and remove this comment
  return(

    <View className="flex flex-1 h-full w-full flex-col justify-start items-center bg-[#221f1f]">
      <Text className="text-center text-4xl mb-7 text-white p-5">All Games</Text>
      <View className="flex justify-center items-center w-full flex-wrap">
      <FlatList
      key={numColumns}
      numColumns={numColumns}
      data={data}
      ItemSeparatorComponent={() => <View style={{height: 5}} />}
      renderItem={({item}) => (

          <View className="border-2 border-[#2e3233] rounded-xl bg-[#26324a] max-w-[174px]" style={{margin: numColumns == 1 ? 0 : 5}}>
            <ImageBackground imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} 
              className="relative w-[170px] h-[150px] bg-center bg-cover" 
              source={{ uri: item.background_image }}>
              <View className="absolute flex justify-center items-center top-1 right-1 w-[35px] h-[35px] bg-[#242726] rounded-full">
                <View>
                  <Text className="text-[11px] w-full text-white">{item.metacritic}</Text>
                </View>
              </View>
            </ImageBackground>
            <View className="flex-1 gap-5 flex-col justify-between p-5">
              <Text className='text-white'>{item.name}</Text>
              <View className="flex flex-row flex-wrap">
                {item.parent_platforms.map((v, i) => {
                    
                    if (v.platform.name.includes("PlayStation") || v.platform.name.includes("PS")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/ps.png')} />;
                    }

                    if (v.platform.name.includes("Xbox")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/xbox.png')} />
                    }

                    if (v.platform.name.includes("Nintendo")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/nintendo.png')} />
                    }

                    if (v.platform.name.includes("PC")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/pc.png')} />
                    }

                    if (v.platform.name.includes("macOS")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/mac.png')} />
                    }

                    if (v.platform.name.includes("Linux")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/linux.png')} />
                    }

                    if (v.platform.name.includes("Android")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/android.png')} />
                    }

                    if (v.platform.name.includes("iOS")){
                      return <Image key={i} className="w-4 h-4" source={require('./assets/platforms/ios.png')} />
                    }
                    return null
                })}
              </View>
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