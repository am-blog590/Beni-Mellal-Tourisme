


import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function TabLayout() {

  return (
<GestureHandlerRootView style={{flex:1}}> 
   <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="attractions" options={{animation:"slide_from_right"}}/>
      <Stack.Screen name="details" options={{animation:"slide_from_bottom"}}/>
      <Stack.Screen name="explore" options={{animation:"slide_from_right"}}/>
      
   </Stack>
</GestureHandlerRootView>

  );
}

