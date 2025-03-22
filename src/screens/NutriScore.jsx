import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const products = [
  {
    id: "1",
    name: "lentils goya",
    image: require("../Images/soya.jpg"), // Replace with actual image
  },
  {
    id: "2",
    name: "amul paneer",
    image: require("../Images/paneer.jpg"), // Replace with actual image
  },
  {
    id: "3",
    name: "Naturals, Pinto Beans - Meijer",
    image: require("../Images/best_green_score.jpg"), // Replace with actual image
  },
  {
    id: "4",
    name: "Blackeye peas - Schnucks - 16 oz",
    image: require("../Images/best_green_score.jpg"), // Replace with actual image
  },
];

const ProductCard = ({ item }) => {
  // Only "lentils goya" (id === "1") will have details to toggle
  const [showDetails, setShowDetails] = useState(false);

  const handlePress = () => {
    // Toggle details on press
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>{item.name}</Text>
      {/* Only show details for "lentils goya" */}
      {showDetails && item.id === "1" && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            Barcode: 0041331023061 (EAN / EAN-13) or 041331023061 (UPC / UPC-A)
          </Text>
          <Text style={styles.detailText}>Quantity: 397 g</Text>
          <Text style={styles.detailText}>Packaging: Pp-bag</Text>
          <Text style={styles.detailText}>Brands: Goya</Text>
          <Text style={styles.detailText}>Brand owner: Goya Foods, Inc.</Text>
          <Text style={styles.detailText}>
            Categories: Plant-based foods and beverages, Plant-based foods, Fruits and vegetables based foods, Legumes and their products, Legumes, Seeds, Vegetables based foods, Legume seeds, Vegetables, Pulses, Lentils, Mixed vegetables
          </Text>
          <Text style={styles.detailText}>Countries where sold: United States</Text>
          <Text style={[styles.detailText, { marginTop: 5, fontWeight: "bold" }]}>
            NUTRITIONAL FACTS
          </Text>
          <Text style={styles.detailText}>
            Energy: 1,490 kj (356 kcal) per 100 g / 669 kj (160 kcal) per serving
          </Text>
          <Text style={styles.detailText}>
            Fat: 0 g | Saturated fat: 0 g | Trans fat: 0 g
          </Text>
          <Text style={styles.detailText}>Cholesterol: 0 mg</Text>
          <Text style={styles.detailText}>
            Carbohydrates: 64.4 g | Sugars: 2.22 g | Fiber: 11.1 g
          </Text>
          <Text style={styles.detailText}>
            Proteins: 24.4 g | Salt: 0 g
          </Text>
          <Text style={styles.detailText}>
            Vitamin A: 0 µg | Vitamin C: 0 mg
          </Text>
          <Text style={styles.detailText}>
            Potassium: 678 mg | Calcium: 44.4 mg | Iron: 6 mg
          </Text>
        </View>
      )}
    </View>
  );
};

const NutriScore = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 10,
    backgroundColor: "#eaeaea",
    padding: 10,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 3,
  },
});

export default NutriScore;
