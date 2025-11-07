
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export type Attraction = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const attractionsData: Attraction[] = [
  { 
    id: '1', 
    title: 'Lac Bin El Ouidane', 
    description: 'A stunning man-made lake with azure waters', 
    image: require('../assets/images/aze.jpg') 
  },
  { 
    id: '2', 
    title: 'Cascades d\'Ouzoud', 
    description: 'Morocco\'s most spectacular waterfalls', 
    image: require('../assets/images/ouzoud.jpg') 
  },
  { 
    id: '3', 
    title: 'Kasbah Ras El Ain', 
    description: 'An ancient fortress overlooking the city', 
    image: require('../assets/images/lbohayra.jpg') 
  },
  { 
    id: '4', 
    title: 'Souk', 
    description: 'Traditional market with crafts and foods', 
    image: require('../assets/images/Souk.jpg') 
  },
  { 
    id: '5', 
    title: 'Kasbah Kal3a', 
    description: 'Historic kasbah with beautiful views', 
    image: require('../assets/images/kal3a.jpg') 
  },
  { 
    id: '6', 
    title: 'Ain Asserdoun', 
    description: 'Natural spring with scenic surroundings', 
    image: require('../assets/images/ainassardon.webp') 
  },
];

export default function Attractions() {
  const [searchText, setSearchText] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const router = useRouter();

  const handleNavigateToDetails = (attraction: Attraction) => {
   
    router.push({
      pathname: '/details',
      params: { 
        attractionId: attraction.id,
        title: attraction.title,
        description: attraction.description,
      }
    });
  };

  const toggleLike = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(prev => prev.filter(itemId => itemId !== id));
    } else {
      setLikedIds(prev => [...prev, id]);
    }
  };

  const renderItem = ({ item }: { item: Attraction }) => {
    const isLiked = likedIds.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => handleNavigateToDetails(item)}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.infoBox}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Heart icon */}
          <TouchableOpacity 
            onPress={() => toggleLike(item.id)} 
            style={styles.heartButton}
          >
            <FontAwesome 
              name="heart" 
              size={24} 
              color={isLiked ? "red" : "white"} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.titre}>Discover</Text>
        <TouchableOpacity 
                  style={styles.backButton} 
                  onPress={() => router.back()}
                >
                  <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
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
        <Text style={styles.attractionItem}>Lacs</Text>
        <Text style={styles.attractionItem}>Forest</Text>
        <Text style={styles.attractionItem}>Kasbah</Text>
      </View>

      {/* Attraction cards list */}
      <FlatList
        data={attractionsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
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
    marginTop: 10,
    marginLeft: '30%',
    fontFamily: 'PlayfairDisplay_700Bold',
    justifyContent: 'center',
    alignItems: 'center',

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
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
    backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 25,
  }
});