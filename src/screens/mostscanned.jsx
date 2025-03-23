import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const MostScanned = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://world.openfoodfacts.org/api/v2/search?sort=popularity&page_size=10")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.products
          .filter((product) => product.image_url) // Ensure product has an image
          .slice(0, 10); // Limit to 10 products

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Loading Most Scanned Products...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.code}
        numColumns={2} // Two-column layout
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.title}>{item.product_name || "Unnamed Product"}</Text>
            <Text style={styles.details}>Brand: {item.brands || "N/A"}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
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
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f0f8ea",
    padding: 10,
    margin: 8,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
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
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MostScanned;
