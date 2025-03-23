import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.iconText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bit Bytess</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('DevelopersScreen')}>
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <ImageBackground
            source={require('../Images/heroimage.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>let's go green</Text>
            <Text style={styles.heroSubtitle}>
              Trust the process when we aprove
            </Text>
          </View>
        </View>

        {/* Top Rated Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated Products</Text>
          <Text style={styles.sectionSubtitle}>
            These are the products which are best
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productsScroll}>
            {/* Product 1 */}
            <TouchableOpacity onPress={() => navigation.navigate('NutriScore')}>
              <View style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image
                    source={require('../Images/best_nutri_score.jpg')}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.productTitle}>
                  Products with the best Nutri score
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Green')}>
              <View style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image
                    source={require('../Images/best_green_score.jpg')}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.productTitle}>
                  Products with the best Green score
                </Text>
              </View>
            </TouchableOpacity>
            {/* Product 3 */}
            <View style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image
                  source={require('../Images/sustaniable_image.jpg')}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.productTitle}>
                Compostable & Biodegradable Items
              </Text>
            </View>

            {/* Product 4 */}
            <View style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image
                  source={require('../Images/most_scanned.jpeg')}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.productTitle}>Most scanned products</Text>
            </View>
          </ScrollView>
        </View>

        {/* Product Types Section *
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product types</Text>
          
          <View style={styles.categoryContainer}>
            {/* Category 1 *
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => navigation.navigate('MainProducts')}
            >
              <Text style={styles.categoryText}>All Products</Text>
            </TouchableOpacity>
            
            {/* Category 2 *
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Category</Text>
            </View>
            
            {/* Category 3 *
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Category</Text>
            </View>
          </View>
        </View>
        
        {/* Barcode Scanner */}
        <TouchableOpacity
          style={styles.barcodeSection}
          onPress={() => navigation.navigate('Camera')}>
          <View style={styles.barcodeFrame}>
            <View style={styles.barcodeCorner1} />
            <View style={styles.barcodeCorner2} />
            <View style={styles.barcodeCorner3} />
            <View style={styles.barcodeCorner4} />
          </View>
          <Text style={styles.barcodeText}>SCAN BARCODE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconText: {
    color: 'white',
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  heroBanner: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  productsScroll: {
    marginLeft: -8,
  },
  productCard: {
    width: 120,
    marginHorizontal: 8,
  },
  productImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categoryCard: {
    width: '31%',
    height: 100,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  barcodeSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  barcodeFrame: {
    width: 120,
    height: 120,
    position: 'relative',
    marginBottom: 16,
  },
  barcodeCorner1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#000',
  },
  barcodeCorner2: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#000',
  },
  barcodeCorner3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#000',
  },
  barcodeCorner4: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#000',
  },
  barcodeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
