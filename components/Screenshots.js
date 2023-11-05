import { View, Text, Image, ScrollView, Modal, Pressable } from "react-native";
import useFetch from "./useFetch";
import ImageViewer from "react-native-reanimated-image-viewer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";

const Screenshots = ({gameName}) => {
    const { data, isLoading, error } = useFetch(`https://api.rawg.io/api/games/${gameName}/screenshots`);
    const [isVisible, setIsVisible] = useState(false);
    const [img, setImg] = useState(null);
    const imageUrl = "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=2726&h=2047&dpr=1";

    function getImg(img){
        setImg(img);
        setIsVisible(!isVisible);
    }

    if(data != null){
        return (    
            <View className="text-center p-5">
                <Text className="text-white text-xl mb-3">Screenshots</Text>
                <View>
                    <ScrollView horizontal={true} className="flex gap-3">
                    {data.results.map((v, i) => {
                            return <Pressable key={i} onPress={() => getImg(v.image)}><Image className="h-44 w-64 rounded-xl" key={i} source={{ uri: v.image }} /></Pressable>
                    })}
                    </ScrollView>
                </View>
                <Modal visible={isVisible} animationType="fade">
                    <View className="flex justify-center items-center h-screen w-screen">
                        <GestureHandlerRootView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ImageViewer
                                imageUrl={img} width={1920} height={1080} onRequestClose={() => {}}
                            />
                            <Pressable className="p-5 w-screen bg-[#221f1f]" onPress={() => setIsVisible(!isVisible)}>
                                <View>
                                    <Text className="text-center text-white">Close Image</Text>
                                </View>
                            </Pressable>
                        </GestureHandlerRootView>
                    </View>
                    
                </Modal>
            </View>
         );
    } else {
        return (
            <View className="flex flex-row text-center p-5">
                <Text className="text-white text-xl">Screenshots</Text>
            </View>
        );
    }
}
 
export default Screenshots;