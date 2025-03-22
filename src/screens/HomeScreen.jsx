import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';

const sampleProducts = [
  {
    id: 1,
    name: 'xyz',
    category: 'Vegan',
    price: '$19.99',
    rating: 4.5,
    description: 'A sustainable and eco-friendly product that helps reduce environmental impact.',
    ingredients: ['Organic ingredient 1', 'Natural ingredient 2', 'Eco-friendly ingredient 3'],
    sustainability: {
      score: 8.5,
      features: ['Eco-friendly packaging', 'Sustainable sourcing', 'Carbon neutral'],
    },
    nutritionalInfo: {
      calories: '120 kcal',
      protein: '5g',
      carbs: '15g',
      fats: '4g',
    },
  },
  {
    id: 2,
    name: 'skin care',
    category: 'Cheap Eat',
    price: '$24.99',
    rating: 4.8,
    description: 'Natural and organic skincare product for all skin types.',
    ingredients: ['Aloe Vera', 'Vitamin E', 'Natural oils'],
    sustainability: {
      score: 9.0,
      features: ['Recyclable packaging', 'Cruelty-free', 'Natural ingredients'],
    },
    nutritionalInfo: {
      calories: '0 kcal',
      protein: '0g',
      carbs: '0g',
      fats: '0g',
    },
  },
  {
    id: 3,
    name: 'Food products',
    category: 'Italian',
    price: '$15.99',
    rating: 4.2,
    description: 'Authentic Italian food product made with traditional recipes.',
    ingredients: ['Durum wheat', 'Fresh herbs', 'Olive oil'],
    sustainability: {
      score: 7.5,
      features: ['Local sourcing', 'Traditional methods', 'Minimal processing'],
    },
    nutritionalInfo: {
      calories: '200 kcal',
      protein: '8g',
      carbs: '25g',
      fats: '6g',
    },
  },
];

export default function HomeScreen({ navigation }) {
  const renderProductCard = (product) => (
    <TouchableOpacity 
      key={product.id}
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product })}
    >
      <View style={styles.productImageContainer}>
        <View style={styles.productImage} />
      </View>
      <Text style={styles.productTitle}>{product.name}</Text>
      <Text style={styles.productSubtitle}>{product.category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.iconText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bit Bytess</Text>
        <TouchableOpacity>
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>let's go green</Text>
            <Text style={styles.heroSubtitle}>Trust the process when we aprove</Text>
          </View>
        </View>
        
        {/* Top Rated Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated Products</Text>
          <Text style={styles.sectionSubtitle}>These are the products which are best</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            {sampleProducts.map(product => renderProductCard(product))}
          </ScrollView>
        </View>
        
        {/* Product Types Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product types</Text>
          
          <View style={styles.categoryContainer}>
            {/* Category 1 */}
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Category</Text>
            </View>
            
            {/* Category 2 */}
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Category</Text>
            </View>
            
            {/* Category 3 */}
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Category</Text>
            </View>
          </View>
        </View>
        
        {/* Barcode Scanner */}
        <TouchableOpacity 
          style={styles.barcodeSection}
          onPress={() => navigation.navigate('Camera')}
        >
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
    backgroundColor: '#4CAF50', // Green color as placeholder
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
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
    backgroundColor: '#ddd',
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