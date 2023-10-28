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
import Home from './components/Home';

const App = () => {
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