import { Modal, View, Text, Animated, Pressable, TextInput, Image, FlatList } from "react-native";
import React, {useState, useEffect, useRef} from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import {API_KEY} from '@env'
import { NativeWindStyleSheet } from "nativewind";
import axios from 'axios';

const Search = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [text, setText] = useState("");
    const [results, setResults] = useState(null);

    const inputRef = useRef();

    const animated = new Animated.Value(1);
    const fadeIn = () => {
      Animated.timing(animated, {
        toValue: 0.4,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
    const fadeOut = () => {
      Animated.timing(animated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    const searchGames = async () => {
      if(text != ""){
        try {
          const response = await axios.get(
            `https://api.rawg.io/api/games?search=${text} &key=${API_KEY}`,
          )
          setResults(response.data.results);
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    const platforms = [ { "name": "PlayStation", "icon": require('../assets/platforms/ps.png')}, { "name": "Xbox", "icon": require('../assets/platforms/xbox.png')},
                      { "name": "Nintendo", "icon": require('../assets/platforms/nintendo.png')}, { "name": "PC", "icon": require('../assets/platforms/pc.png')},
                      { "name": "macOS", "icon": require('../assets/platforms/mac.png')}, { "name": "Linux", "icon": require('../assets/platforms/linux.png')},
                      { "name": "Android", "icon": require('../assets/platforms/android.png')}, { "name": "iOS", "icon": require('../assets/platforms/ios.png')}, ];

    return ( 
        <View className="absolute h-full w-full">
            <Pressable onPressIn={() =>{ fadeIn; setIsHidden(!isHidden)}} onPressOut={fadeOut} className="absolute bottom-20 right-8 p-5 bg-gray-600 rounded-full">
                <Animated.View style={{opacity: animated}}>
                <Ionicons name="md-search-outline" size={32} color="white" />
                </Animated.View>
            </Pressable>
            <GestureHandlerRootView>
            <Modal visible={isHidden} onShow={() => inputRef.current?.focus()} onRequestClose={() => setIsHidden(!isHidden)}>
                <SafeAreaView className="bg-[#221f1f] flex justify-center items-center h-full w-full">
                  <View className="flex w-full justify-center items-center flex-row pt-[20%]">
                    <TextInput
                      ref={inputRef} onChangeText={setText} value={text}
                       placeholder="Search Games" placeholderTextColor="white" 
                      className="h-[60px] w-4/5 p-5 text-center border-b-2 border-white text-white" />
                  </View>
                    <FlatList 
                      contentContainerStyle ={{ display: "flex", justifyContent: "center", paddingBottom: 100 }}
                      key={results?.id}
                      data={results}
                      renderItem={({item}) => (
                        <View key={results.id} className="flex flex-row gap-5 px-5 pt-7 w-4/5">
                          <Image className="w-24 h-20 rounded-xl" source={{ uri: item.background_image }} />
                          <View className="flex flex-col justify-around">
                              <Text className="text-white font-bold text-xl">{item.name}</Text>
                            <View className="flex flex-row">
                            {item.parent_platforms.map((v, i) => {
                              return (
                                <View key={i}>
                                  { platforms.map((item, key) => {
                                    if(v.platform.name.includes(item.name)){
                                      return <Image key={key} className="w-5 h-5" source={item.icon} />
                                    }
                                  }) }
                                </View>
                              );                
                            })}
                            </View>
                          </View>
                        </View>
                      )}
                    />             
                </SafeAreaView>
                <Pressable onPress={() => searchGames()} className="p-5 w-full bg-slate-800 absolute bottom-0 rounded-tl-xl rounded-tr-xl">
                  <Text className="text-white text-center">Search</Text>
                </Pressable>
            </Modal>
            </GestureHandlerRootView>
        </View>
     );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
 
export default Search;