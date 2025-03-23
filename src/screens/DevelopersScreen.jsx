import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const developers = [
  { name: 'Hariom Khonde', role: 'Frontend Developer', image: require('../Images/hariom.jpg') },
  { name: 'Vishist GuruPrasad', role: 'Backend Developer', image: require('../Images/vish.jpg') },
  { name: 'Eshaan Hazarika', role: 'AiML Developer', image: require('../Images/eshan.jpg') },
  { name: 'Harshita Pakati', role: 'UI/UX Designer', image: require('../Images/harshita.jpg') },
];

export default function DevelopersScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meet the Developers</Text>
      {developers.map((dev, index) => (
        <View key={index} style={styles.card}>
          <Image source={dev.image} style={styles.image} />
          <Text style={styles.name}>{dev.name}</Text>
          <Text style={styles.role}>{dev.role}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
});
