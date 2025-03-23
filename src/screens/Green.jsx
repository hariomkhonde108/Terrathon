import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

const Green = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleInfo, setVisibleInfo] = useState({});

  useEffect(() => {
    fetch(
      "https://world.openfoodfacts.org/api/v2/search?fields=product_name,brands,code,image_url,ecoscore_grade,packaging,quantity&sort_by=unique_scans_n&page_size=200"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.products.filter((item) => {
          const name = item.product_name?.toLowerCase() || "";
          const packaging = item.packaging?.toLowerCase() || "";
          const ecoscore = item.ecoscore_grade?.toLowerCase() || "";

          // ✅ Ensure minimum Eco-Score of A or B
          const isHighEcoScore = ecoscore === "a" || ecoscore === "b";

          // ❌ Exclude water bottles and similar plastic-related items
          const isWaterBottle =
            name.includes("water") || name.includes("bottle") || packaging.includes("bottle");

          return item.image_url && isHighEcoScore && !isWaterBottle;
        });

        // Show only the first 20 items to keep UI clean
        setProducts(filteredProducts.slice(0, 20));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const toggleInfo = (id) => {
    setVisibleInfo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.code}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.heading}>{item.product_name || "No Name"}</Text>
            <TouchableOpacity style={styles.button} onPress={() => toggleInfo(item.code)}>
              <Text style={styles.buttonText}>{visibleInfo[item.code] ? "Hide Info" : "View Info"}</Text>
            </TouchableOpacity>
            {visibleInfo[item.code] && (
              <View style={styles.detailsContainer}>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailText}>🌍 Eco-Score:</Text>
                  <Text style={styles.detailValue}>{item.ecoscore_grade.toUpperCase()}</Text>
                </View>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailText}>🏷️ Barcode:</Text>
                  <Text style={styles.detailValue}>{item.code}</Text>
                </View>
                <View style={styles.detailsRow}>
                  <Text style={styles.detailText}>📦 Brand:</Text>
                  <Text style={styles.detailValue}>{item.brands || "Unknown"}</Text>
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
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "contain",
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

export default Green;
