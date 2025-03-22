import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { generateAnalysis } from '../services/gemini';

export default function ProductDetailsScreen({ route }) {
  const { productName, ecoscoreGrade, ecoscoreScore, packaging, carbonImpact } = route.params;
  const [aiAnalysis, setAiAnalysis] = useState(null);
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
        
        Provide an alternative eco friendly product which exists in the market.
        Provide the name of the product, the brand, and the price.`;

      console.log('Generating analysis...');
      const analysis = await generateAnalysis(prompt);
      console.log('Analysis generated:', analysis);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Analysis Error:', error);
      Alert.alert(
        'AI Analysis Error',
        'Unable to generate analysis. Please try again.',
        [{ text: 'OK' }]
      );
      setAiAnalysis({
        packaging: "📦 Unable to analyze packaging",
        carbonImpact: "🌍 Unable to analyze impact",
        alternative: "🌱 Unable to find alternatives",
        fullAnalysis: "Unable to generate analysis."
      });
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

  const renderAIAnalysis = () => {
    if (!aiAnalysis) return null;

    return (
      <View style={styles.aiAnalysisBox}>
        <Text style={styles.aiTitle}>🌍 Environmental Analysis</Text>
        
        <View style={styles.analysisSection}>
          <Text style={styles.label}>Hidden Environmental Impacts:</Text>
          <Text style={styles.value}>{aiAnalysis.environmentalImpact}</Text>
        </View>

        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>💚 Eco-Friendly Budget Options</Text>
          {aiAnalysis.budgetAlternatives.map((alt, index) => (
            <View key={index} style={styles.alternativeBox}>
              <Text style={styles.value}>{alt}</Text>
            </View>
          ))}
        </View>

        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>🌿 Ingredient Analysis</Text>
          <View style={styles.ingredientBox}>
            <Text style={styles.label}>Sustainability:</Text>
            <Text style={styles.value}>{aiAnalysis.ingredientAnalysis.sustainability}</Text>
            
            <Text style={styles.label}>Environmental Footprint:</Text>
            <Text style={[styles.value, styles.additionalInfo]}>
              {aiAnalysis.ingredientAnalysis.additionalInfo}
            </Text>
          </View>
        </View>

        {typeof aiAnalysis.fullAnalysis === 'string' && (
          <View style={styles.fullAnalysisSection}>
            <Text style={styles.sectionTitle}>📊 Detailed Analysis</Text>
            <Text style={styles.fullAnalysisText}>{aiAnalysis.fullAnalysis}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{productName}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.sectionTitle}>Product Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>🌿 Eco-Score:</Text>
          <Text style={styles.value}>{ecoscoreGrade} ({ecoscoreColor})</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📈 Score:</Text>
          <Text style={styles.value}>{ecoscoreScore} / 100</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>♻️ Packaging:</Text>
          <Text style={styles.value}>{packaging}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>💨 Carbon Impact:</Text>
          <Text style={styles.value}>{carbonImpact}</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Analyzing environmental impact...</Text>
        </View>
      ) : (
        renderAIAnalysis()
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
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
  infoRow: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    marginTop: 5,
  },
  additionalInfo: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1B5E20',
    textAlign: 'center',
  },
  analysisSection: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  alternativeBox: {
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  ingredientBox: {
    backgroundColor: '#F9FBE7',
    padding: 15,
    borderRadius: 8,
  },
  fullAnalysisSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  fullAnalysisText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#4CAF50',
    fontSize: 16,
  }
});