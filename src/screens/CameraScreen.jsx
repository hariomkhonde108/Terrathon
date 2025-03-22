import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    })();
  }, []);

  const onCodeScanned = useCallback(async (codes) => {
    if (codes.length > 0) {
      setIsScanning(false);
      const barcode = codes[0].value;
      try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        const data = await response.json();

        if (data.status === 1 && data.product) {
          const product = data.product;
          const productName = product.product_name || 'Unknown Product';
          const ecoscoreGrade = product.ecoscore_grade?.toUpperCase() || 'N/A';
          const ecoscoreScore = product.ecoscore_score ?? 'N/A';
          const packaging = product.packaging || 'Not specified';
          const carbonImpact = product.environment_impact_level_tags?.[0]?.toUpperCase() || 'Unknown';
          const image_url = product.image_url;
          const ingredients = product.ingredients?.map(ing => ing.text) || [];
        
          navigation.navigate('ProductDetails', {
            productName,
            ecoscoreGrade,
            ecoscoreScore,
            packaging,
            carbonImpact,
            image_url,
            ingredients,
          });
        
        } else {
          Alert.alert(
            'Product Not Found',
            `Barcode: ${barcode}`,
            [
              {
                text: 'Scan Again',
                onPress: () => setIsScanning(true),
              },
              {
                text: 'OK',
                style: 'cancel',
              },
            ]
          );
        }
      } catch (error) {
        console.error('Error fetching product info:', error);
        Alert.alert('Error', 'Could not fetch product data. Try again.');
      }
    }
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isScanning}
        codeScanner={{
          codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128', 'code-39', 'code-93', 'upc-e', 'upc-a'],
          onCodeScanned: onCodeScanned
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea}>
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, !isScanning && styles.buttonStart]} 
          onPress={() => setIsScanning(!isScanning)}
        >
          <Text style={[styles.buttonText, !isScanning && styles.buttonTextStart]}>
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonStart: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextStart: {
    color: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
});
