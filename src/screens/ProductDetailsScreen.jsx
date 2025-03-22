import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { generateAnalysis } from '../services/gemini';

export default function ProductDetailsScreen({ route }) {
  const { productName, ecoscoreGrade, ecoscoreScore, packaging, carbonImpact } = route.params;
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateAIAnalysis();
  }, []);

  const generateAIAnalysis = async () => {
    setIsLoading(true);
    try {
      const prompt = `Analyze the environmental impact of this product:
        Product: ${productName}
        Eco-Score Grade: ${ecoscoreGrade}
        Eco-Score: ${ecoscoreScore}/100
        Packaging: ${packaging}
        Carbon Impact: ${carbonImpact}
        
        Provide a brief, informative analysis of the product's environmental impact and suggestions for improvement.`;

      console.log('Generating analysis...');
      const text = await generateAnalysis(prompt);
      console.log('Analysis generated successfully');
      setAiAnalysis(text);
    } catch (error) {
      console.error('Detailed error:', error);
      console.error('Error stack:', error.stack);
      Alert.alert(
        'AI Analysis Error',
        'Unable to generate analysis. Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
      setAiAnalysis('Unable to generate AI analysis at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const ecoscoreColor = {
    A: '🟢 Excellent',
    B: '🟡 Good',
    C: '🟠 Moderate',
    D: '🔴 Poor',
    E: '⚫ Very Poor',
  }[ecoscoreGrade] || 'Unknown';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{productName}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>🌿 Eco-Score:</Text>
        <Text style={styles.value}>{ecoscoreGrade} ({ecoscoreColor})</Text>

        <Text style={styles.label}>📈 Score:</Text>
        <Text style={styles.value}>{ecoscoreScore} / 100</Text>

        <Text style={styles.label}>♻️ Packaging:</Text>
        <Text style={styles.value}>{packaging}</Text>

        <Text style={styles.label}>💨 Carbon Impact:</Text>
        <Text style={styles.value}>{carbonImpact}</Text>
      </View>

      <View style={styles.aiAnalysisBox}>
        <Text style={styles.aiTitle}>🤖 AI Analysis</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <Text style={styles.aiAnalysis}>{aiAnalysis}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  aiAnalysisBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  aiAnalysis: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});
