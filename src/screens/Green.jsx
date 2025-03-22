import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const products = [
  {
    id: "1",
    name: "Hariom",
    image: require("../Images/soya.jpg"),
  },
  {
    id: "2",
    name: "Lupi Coffee - 400g",
    image: require("../Images/best_green_score.jpg"),
  },
  {
    id: "3",
    name: "Naturals, Pinto Beans - Meijer",
    image: require("../Images/best_green_score.jpg"),
  },
  {
    id: "4",
    name: "Blackeye peas - Schnucks - 16 oz",
    image: require("../Images/best_green_score.jpg"),
  },
];

const Green = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
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
});

export default Green;
