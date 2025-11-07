import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { ChevronUp } from "lucide-react-native";
import { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

SplashScreen.preventAutoHideAsync();

export default function Welcome() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
  });

  const offset = useSharedValue({ y: 0 });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value.y }],
  }));
  
  const router = useRouter();
  

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const navigateToHome = () => {
    router.push("/attractions");
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const maxUp = -100;
      const maxDown = 0;
    
      offset.value = {
        y: Math.min(Math.max(e.translationY, maxUp), maxDown),
      };
    })
    .onEnd((e) => {
      const maxDown = 0;
      const maxUp = -100;

      offset.value = withSpring({ y: 0 }, { mass: 1, stiffness: 300, damping: 17 });
      const maxOffsetY = Math.min(Math.max(e.translationY, maxUp), maxDown);
      if (maxOffsetY === maxUp) {
        scheduleOnRN(navigateToHome);
      }
    });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg1.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View>
          <Text style={styles.title}>Welcome to Beni Mellal!</Text>
          <Text style={styles.subtitle}>
            Where nature, culture, and hospitality meet.
          </Text>
        </View>
        <View>
          <View style={[styles.btnContainer]}>
            <ChevronUp color="#fff" size={48} />
            <Text style={styles.swipeHint}>Swipe up</Text>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.btn, animatedStyle]}>
                <Text style={styles.txt}>Start</Text>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
  },
  overlay: {
    alignItems: "center",
    marginTop: 100,
    gap: 400,
  },
  title: {
    fontSize: 35,
    color: "#fefefeff",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: 'PlayfairDisplay_700Bold', 
  },
  subtitle: {
    fontSize: 20,
    color: "#fefefeff",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: 'PlayfairDisplay_400Regular', 
  },
  btnContainer: {
    width: 100,
    height: 200,
    backgroundColor: "rgba(132, 131, 131, 0.6)",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 100,
    paddingBottom: 10,
    gap: 20,
  },
  btn: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: 25,
    color: "#7B3F00",
    fontFamily: 'PlayfairDisplay_700Bold', 
  },
   swipeHint: {
    fontSize: 12,
    color: '#bfbdbdff',
    fontStyle: 'italic',
  },
});