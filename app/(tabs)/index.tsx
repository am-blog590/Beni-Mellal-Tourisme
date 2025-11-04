import {
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/playfair-display';
import { Image } from 'expo-image';
import { ChevronUp } from 'lucide-react-native';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface HomeScreenProps {
  onStart?: () => void;
  onMenu?: () => void;
}

export default function HomeScreen({ onStart, onMenu }: HomeScreenProps) {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    PlayfairDisplay_800ExtraBold,
  });


  const slide = {
    image: require('../../assets/images/bg1.jpg'),
    // title: 'Welcome to',
    // subtitle: 'Beni Mellal',
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

   
      <View style={styles.backgroundContainer}>
        <Image
          source={slide.image}
          style={styles.backgroundImage}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.overlay} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoSection}>
          <Text style={styles.welcomeText}>Welcome to Beni Mellal!</Text>
          <Text style={styles.appTitle}>
            Where nature, culture, and hospitality meet.
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <ChevronUp color="#bfbdbdff" size={48} />
          <Pressable
            style={styles.secondaryButton}
            onPress={onMenu || onStart}
            android_ripple={{ color: '#FDE68A' }}
          >
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 36,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#ffffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  appTitle: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_800ExtraBold',
    color: '#ffffffff',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 15,
  },
  slideTextContainer: {
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 140,
  },
  slideTitle: {
    fontSize: 36,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#FEF3C7',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  slideSubtitle: {
    fontSize: 64,
    fontFamily: 'PlayfairDisplay_700Bold_Italic',
    color: '#FCD34D',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 15,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 100,
    gap: 40,
    marginTop: 500,
    alignItems: 'center',
    padding: 20,
    height: 200,
    backgroundColor: "rgba(132, 131, 131, 0.6)",
    justifyContent: "flex-end",
    borderRadius: 80,
    paddingBottom: 10,

    
  },
  primaryButton: {
    backgroundColor: '#FCD34D',
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
      width: 80,
    height: 80,
    backgroundColor: "#7B3F00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",

  },
  buttonText: {
    fontSize: 25,
    fontFamily: "PlayfairDisplay_700Bold",
    color: '#ffffffff',
    alignItems: 'center',
  },
});
