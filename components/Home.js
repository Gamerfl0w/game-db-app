import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  FlatList,
  ImageBackground,
  useWindowDimensions,
  Image,
  Pressable,
} from 'react-native';

import axios from 'axios';
import {API_KEY, NAGIO} from '@env'
import Search from './Search';

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

  // function hideOnScroll(){
  //   setIsHidden(setIsHidden(!isHidden));
  //   const timer = setTimeout(() => setIsHidden(!isHidden), 1000);
  //   clearTimeout(timer);
  // }

  const platforms = [ { "name": "PlayStation", "icon": require('../assets/platforms/ps.png')}, { "name": "Xbox", "icon": require('../assets/platforms/xbox.png')},
                      { "name": "Nintendo", "icon": require('../assets/platforms/nintendo.png')}, { "name": "PC", "icon": require('../assets/platforms/pc.png')},
                      { "name": "macOS", "icon": require('../assets/platforms/mac.png')}, { "name": "Linux", "icon": require('../assets/platforms/linux.png')},
                      { "name": "Android", "icon": require('../assets/platforms/android.png')}, { "name": "iOS", "icon": require('../assets/platforms/ios.png')}, ];
                      
  const navigation = useNavigation();

  // dont forget to put error handling
  // add readme(make it descriptive) and remove this comment
  return(
    <View>
      <Text className="text-center text-4xl text-white pt-20">All Games</Text>
        <View className="flex w-full h-full p-2">
          <FlatList
          // onScroll={() => hideOnScroll()}
          contentContainerStyle ={{ display: "flex", justifyContent: "center", paddingBottom: 200 }}
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
                    {/* optimize images */}
                    {item.parent_platforms.map((v, i) => {
                      return (
                        <View key={i}>
                          { platforms.map((item, key) => {
                            if(v.platform.name.includes(item.name)){
                              return <Image key={key} className="w-4 h-4" source={item.icon} />
                            }
                          }) }
                        </View>
                      );                
                    })}
                  </View>
                </View>
            </Pressable>

          )}/>
        </View>
        
        <View className="absolute h-full w-full">
          <Search />
        </View>
    </View>

  )
 
}

export default Home;