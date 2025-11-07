
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');


const attractionsData = [
  { 
    id: '1', 
    title: 'Lac Bin El Ouidane', 
    description: 'A stunning man-made lake with azure waters', 
    image: require('../assets/images/aze.jpg'),
    fullDesc: 'Lac Bin El Ouidane est un magnifique lac artificiel situé dans la province de Beni Mellal. Créé en 1953, ce lac offre des eaux turquoise cristallines entourées de montagnes majestueuses. C\'est un lieu parfait pour la pêche, les sports nautiques et la détente en famille. Le paysage spectaculaire attire des visiteurs du monde entier.',
    gallery: [
      require('../assets/images/aze.jpg'),
      require('../assets/images/aze.jpg'),
      require('../assets/images/aze.jpg'),
    ]
  },
  { 
    id: '2', 
    title: 'Cascades d\'Ouzoud', 
    description: 'Morocco\'s most spectacular waterfalls', 
    image: require('../assets/images/ouzoud.jpg'),
    fullDesc: 'Les Cascades d\'Ouzoud sont parmi les plus belles chutes d\'eau du Maroc, avec une hauteur impressionnante de 110 mètres. Situées dans le Moyen Atlas, elles offrent un spectacle naturel époustouflant. Vous pourrez observer des singes magots dans leur habitat naturel et profiter d\'une baignade rafraîchissante dans les bassins naturels.',
    gallery: [
      require('../assets/images/ouzoud.jpg'),
      require('../assets/images/ouzoud.jpg'),
      require('../assets/images/ouzoud.jpg'),
    ]
  },
  { 
    id: '3', 
    title: 'Kasbah Ras El Ain', 
    description: 'An ancient fortress overlooking the city', 
    image: require('../assets/images/lbohayra.jpg'),
    fullDesc: 'La Kasbah Ras El Ain est une forteresse historique qui surplombe la ville de Beni Mellal. Cette ancienne citadelle offre une vue panoramique exceptionnelle sur la région. Construite au 17ème siècle, elle témoigne de l\'architecture militaire marocaine traditionnelle et de l\'histoire riche de la région.',
    gallery: [
      require('../assets/images/lbohayra.jpg'),
      require('../assets/images/lbohayra.jpg'),
      require('../assets/images/lbohayra.jpg'),
    ]
  },
  { 
    id: '4', 
    title: 'Souk', 
    description: 'Traditional market with crafts and foods', 
    image: require('../assets/images/Souk.jpg'),
    fullDesc: 'Le Souk de Beni Mellal est un marché traditionnel vibrant où vous découvrirez l\'authenticité marocaine. Artisanat local, épices colorées, fruits frais et produits traditionnels s\'offrent à vous dans une atmosphère animée. C\'est l\'endroit idéal pour découvrir la culture locale et ramener des souvenirs uniques.',
    gallery: [
      require('../assets/images/Souk.jpg'),
      require('../assets/images/Souk.jpg'),
      require('../assets/images/Souk.jpg'),
    ]
  },
  { 
    id: '5', 
    title: 'Kasbah Kal3a', 
    description: 'Historic kasbah with beautiful views', 
    image: require('../assets/images/kal3a.jpg'),
    fullDesc: 'La Kasbah Kal3a est un site historique impressionnant qui témoigne du passé glorieux de la région. Perchée sur une colline, elle offre des vues spectaculaires sur les plaines environnantes. Cette forteresse bien préservée est un exemple remarquable de l\'architecture défensive marocaine.',
    gallery: [
      require('../assets/images/kal3a.jpg'),
      require('../assets/images/kal3a.jpg'),
      require('../assets/images/kal3a.jpg'),
    ]
  },
  { 
    id: '6', 
    title: 'Ain Asserdoun', 
    description: 'Natural spring with scenic surroundings', 
    image: require('../assets/images/ainassardon.webp'),
    fullDesc: 'Ain Asserdoun est une source naturelle magnifique nichée dans un cadre verdoyant. L\'eau cristalline jaillit de la roche et crée un oasis de fraîcheur. C\'est un lieu prisé pour les pique-niques en famille et un point de départ idéal pour des randonnées dans la nature environnante.',
    gallery: [
      require('../assets/images/ainassardon.webp'),
      require('../assets/images/ainassardon.webp'),
      require('../assets/images/ainassardon.webp'),
    ]
  },
];

export default function AttractionDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  
  const attraction = attractionsData.find(a => a.id === params.attractionId);

  const [isLiked, setIsLiked] = useState(false);

  if (!attraction) {
    return (
      <View style={styles.container}>
        <Text>Attraction non trouvée</Text>
      </View>
    );
  }

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
     
        <View style={styles.imageContainer}>
          <Image source={attraction.image} style={styles.headerImage} />
          
  
          <View style={styles.gradient} />

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleLike}
          >
            <FontAwesome 
              name="heart" 
              size={28} 
              color={isLiked ? "#FF4757" : "#fff"} 
            />
          </TouchableOpacity>

  
          <Text style={styles.headerTitle}>{attraction.title}</Text>
        </View>


        <View style={styles.contentCard}>
 
          <View style={styles.shortDescBox}>
            <FontAwesome name="map-marker" size={20} color="#d4a473" />
            <Text style={styles.shortDescription}>{attraction.description}</Text>
          </View>

          {/* Section: About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À Propos</Text>
            <Text style={styles.fullDescription}>{attraction.fullDesc}</Text>
          </View>

          {/* Section: Gallery */}
          {attraction.gallery && attraction.gallery.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Galerie Photos</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryContainer}
              >
                {attraction.gallery.map((img, index) => (
                  <View key={index} style={styles.galleryImageWrapper}>
                    <Image source={img} style={styles.galleryImage} />
                  </View>
                ))}
              </ScrollView>
            </View>
          )}


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations</Text>
            
            <View style={styles.infoRow}>
              <FontAwesome name="clock-o" size={20} color="#d4a473" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Horaires</Text>
                <Text style={styles.infoValue}>Tous les jours: 8h00 - 18h00</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome name="ticket" size={20} color="#d4a473" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Tarif</Text>
                <Text style={styles.infoValue}>Gratuit / Entrée libre</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome name="car" size={20} color="#d4a473" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Accès</Text>
                <Text style={styles.infoValue}>En voiture ou transport public</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <FontAwesome name="map" size={20} color="#fff" />
              <Text style={styles.buttonText}>Voir sur la carte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <FontAwesome name="share-alt" size={20} color="#d4a473" />
              <Text style={styles.secondaryButtonText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6AD',
  },
  imageContainer: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 25,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 25,
  },
  headerTitle: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  contentCard: {
    backgroundColor: '#FFD6AD',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  shortDescBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    gap: 10,
  },
  shortDescription: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  fullDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
  },
  galleryContainer: {
    gap: 15,
  },
  galleryImageWrapper: {
    width: 200,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    gap: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4a473',
    paddingVertical: 15,
    borderRadius: 15,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 15,
    gap: 10,
    borderWidth: 2,
    borderColor: '#d4a473',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4a473',
  },
});