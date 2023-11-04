import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    ImageBackground,
    Image,
    Pressable,
    Button,
    useWindowDimensions,
    ScrollView
  } from 'react-native';

import useFetch from "./useFetch";
import { useEffect, useState } from 'react';

const GameDetails = ({id}) => {
    const { data, isLoading, error } = useFetch('https://api.rawg.io/api/games/' + id);
    const [expand, setExpand] = useState(false);

    if (data != null) {
      // const { item } = useFetch(`https://api.rawg.io/api/games/${data.slug}/screenshots`);
      // console.log(item.results);
      return ( 
        <View className="h-full w-full">  
           <ImageBackground className="relative h-[30%] w-full bg-contain bg-center" imageStyle={{ height: "full" }} source={{ uri: data.background_image }}>
            <View className="flex justify-center items-center h-[50%] w-full ">
            </View>
           </ImageBackground>
           <View className="flex flex-row justify-between px-5 pt-5">
              <View><Text className="text-white text-lg">{data.name}</Text></View>
              <View className="bg-white px-5 rounded-lg"><Text className="text-xl font-bold">{data.metacritic}</Text></View>
           </View>
           <View className={ expand ? "flex-1" : "" }>
              <ScrollView className="flex flex-col text-center flex-grow">
                <View className={ expand ? "" : "h-44" }>
                  <Text className="text-white p-4">{data.description_raw}</Text>
                </View>
              </ScrollView>
              <Pressable className={ expand ? "hidden" : "w-full" } onPress={() => setExpand(true)}><Text className="text-white text-center">See more</Text></Pressable>
           </View>
        </View>
      );

      } else {
        return ( 
          <View className="w-full h-full">
             <Text className="text-white">Loading...</Text>
          </View>
        );
    }
}
 
export default GameDetails;