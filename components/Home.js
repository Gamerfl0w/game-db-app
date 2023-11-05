import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Image,
  Pressable
} from 'react-native';

import axios from 'axios';
import {API_KEY, NAGIO} from '@env'

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

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

  function showId(id){
    setId(id);
  }
  
  const navigation = useNavigation();

  // dont forget to put error handling
  // add readme(make it descriptive) and remove this comment
  return(
    <View>
      <Text className="text-center text-4xl text-white pt-20">All Games</Text>
        <View className="flex w-full h-full p-2">
          <FlatList
          contentContainerStyle ={{ display: "flex", justifyContent: "center", paddingBottom: 100 }}
          key={numColumns}
          numColumns={numColumns}
          data={data}
          renderItem={({item}) => (
            <Pressable className="border-2 border-[#2e3233] rounded-xl bg-[#26324a] max-w-[174px]" style={{margin: numColumns == 1 ? 0 : 5}} onPress={() => {
              navigation.navigate('Details', {
                id: item.id
              });
              }}>
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
            </Pressable>

          )}/>
        </View>
    </View>

  )
 
}

export default Home;