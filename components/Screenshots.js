import { View, Text, Image, ScrollView } from "react-native";
import useFetch from "./useFetch";

const Screenshots = ({gameName}) => {
    const { data, isLoading, error } = useFetch(`https://api.rawg.io/api/games/${gameName}/screenshots`);

    if(data != null){
        // console.log(data.results[0].image)
        return ( 
            <View className="text-center p-5">
                <Text className="text-white text-xl mb-3">Screenshots</Text>
                <View>
                   <ScrollView horizontal={true} className="flex gap-3">
                   {data.results.map((v, i) => {
                        return <Image className="h-44 w-64 rounded-xl" key={i} source={{ uri: v.image }} />
                    })}
                   </ScrollView>
                </View>
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