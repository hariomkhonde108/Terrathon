import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://world.openfoodfacts.org/api/v2/search?fields=product_name,brands,code,packaging,image_url,nutrition_grades,ecoscore_grade,quantity&sort_by=nutri_score")
      .then((response) => response.json())
      .then((data) => {
        // Filter products that have images
        const filteredProducts = data.products.filter((item) => item.image_url);
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.code}
        numColumns={2} // Two-column layout
        columnWrapperStyle={styles.row} // Styling for the row
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
};

const ProductCard = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.text}>{item.product_name || "No Name"}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShowDetails(!showDetails)}>
        <Text style={styles.buttonText}>{showDetails ? "Hide Info" : "View Info"}</Text>
      </TouchableOpacity>
      {showDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>📦 Brand:</Text>
            <Text style={styles.detailValue}>{item.brands || "Unknown"}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>🏷️ Barcode:</Text>
            <Text style={styles.detailValue}>{item.code}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>🥗 Nutri-Score:</Text>
            <Text style={styles.detailValue}>{item.nutrition_grades?.toUpperCase() || "N/A"}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>🌍 Eco-Score:</Text>
            <Text style={styles.detailValue}>{item.ecoscore_grade?.toUpperCase() || "N/A"}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>📦 Packaging:</Text>
            <Text style={styles.detailValue}>{item.packaging || "N/A"}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>⚖️ Quantity:</Text>
            <Text style={styles.detailValue}>{item.quantity || "N/A"}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    width: "48%", // Two columns layout
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
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 6,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 5,
    backgroundColor: "#eaeaea",
    padding: 8,
    borderRadius: 8,
    width: "100%",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  detailText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 12,
    color: "#555",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductList;
