import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.category}>Category: {product.category}</Text>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    category: {
        fontSize: 16,
        color: '#555',
    },
    rating: {
        fontSize: 16,
        color: '#FFD700',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
});

export default ProductDetailsScreen;
