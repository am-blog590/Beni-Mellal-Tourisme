// Attractions.tsx
import { FontAwesome } from '@expo/vector-icons'; // <-- Import FontAwesome
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type Attraction = {
  id: string;
  title: string;
  description: string;
  image: any;
};

export type RootStackParamList = {
  Attractions: undefined;
  AttractionDetails: { attraction: Attraction };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Attractions'>;

const attractionsData: Attraction[] = [
  { id: '1', title: 'Lac Bin El Ouidane', description: 'A stunning man-made lake with azure waters', image: require('../../assets/aze.jpg') },
  { id: '2', title: 'Cascades d’Ouzoud', description: 'Morocco’s most spectacular waterfalls', image: require('../../assets/ouzoud.jpg') },
  { id: '3', title: 'Kasbah Ras El Ain', description: 'An ancient fortress overlooking the city', image: require('../../assets/lbohayra.jpg') },
  { id: '4', title: 'Souk', description: 'Traditional market with crafts and foods', image: require('../../assets/Souk.jpg') },
  { id: '5', title: 'Kasbah Kal3a', description: 'Historic kasbah with beautiful views', image: require('../../assets/kal3a.jpg') },
  { id: '6', title: 'Ain Asserdoun', description: 'Natural spring with scenic surroundings', image: require('../../assets/ainassardon.webp') },
];

function Attractions() {
  const [searchText, setSearchText] = useState('');
  
  // <-- State to track liked cards
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Title and Search */}
      <Text style={styles.titre}>Discover</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#fff"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Attraction categories list */}
      <View style={styles.attractionList}>
        <Text style={styles.attractionItem}>Cascades</Text>
        <Text style={styles.attractionItem}>Lakes</Text>
        <Text style={styles.attractionItem}>Forest</Text>
        <Text style={styles.attractionItem}>Kasbah</Text>
      </View>

      {/* Attraction cards list */}
      <FlatList<Attraction>
        data={attractionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isLiked = likedIds.includes(item.id);
          const toggleLike = () => {
            if (isLiked) {
              setLikedIds(prev => prev.filter(id => id !== item.id));
            } else {
              setLikedIds(prev => [...prev, item.id]);
            }
          };

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AttractionDetails', { attraction: item })}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.infoBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                {/* Heart icon */}
                <TouchableOpacity onPress={toggleLike} style={styles.heartButton}>
                  <FontAwesome name="heart" size={24} color={isLiked ? "red" : "white"} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0.3 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#FFD6AD',
  },
  titre: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    marginTop: 30,
    marginLeft: '2%',
  },
  searchInput: {
    backgroundColor: '#d4a473ff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    fontSize: 16,
    marginLeft: '2%',
    width: '92%',
  },
  attractionList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginTop: 10,
    marginLeft: '1%',
    marginRight: '1%',
    paddingBottom: 10,
  },
  attractionItem: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    width: 370,
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#917527',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  infoBox: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: '#D9D9D9',
    opacity: 0.7,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000ff',
  },
  description: {
    fontSize: 15,
    color: '#000000ff',
  },
  // Style for heart icon
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Attractions;
