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

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {height, width} = useWindowDimensions();
  let numColumns = 2;

  function responsiveCards(){
    width >= 640 ? numColumns = 3 : numColumns = 2;
  }

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

  // dont forget to put error handling
  // add readme(make it descriptive) and remove this comment
  return(
    <View>
      <Text className="text-center text-4xl text-white p-5">All Games</Text>
      <View className="flex w-full h-full p-6">
        <FlatList
        contentContainerStyle ={{ display: 'flex', justifyContent: "center", alignContent: "center", paddingBottom: 300 }}
        key={numColumns}
        numColumns={numColumns}
        data={data}
        // ItemSeparatorComponent={() => <View style={{margin: 20}} />}
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
            <View className="flex-1 gap-5 flex-col justify-between p-5 mb-10">
              <Text className='text-white'>{item.name}</Text>
              <View className="flex flex-row flex-wrap">
                {/* create better code and optimize images */}
                {item.parent_platforms.map((v, i) => {
                    
                    if (v.platform.name.includes("PlayStation") || v.platform.name.includes("PS")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/ps.png')} />;
                    }

                    if (v.platform.name.includes("Xbox")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/xbox.png')} />
                    }

                    if (v.platform.name.includes("Nintendo")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/nintendo.png')} />
                    }

                    if (v.platform.name.includes("PC")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/pc.png')} />
                    }

                    if (v.platform.name.includes("macOS")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/mac.png')} />
                    }

                    if (v.platform.name.includes("Linux")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/linux.png')} />
                    }

                    if (v.platform.name.includes("Android")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/android.png')} />
                    }

                    if (v.platform.name.includes("iOS")){
                      return <Image key={i} className="w-4 h-4" source={require('../assets/platforms/ios.png')} />
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

// NativeWindStyleSheet.setOutput({
//   default: "native",
// });

export default Home;