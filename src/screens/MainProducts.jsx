import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function MainProducts() {
  const renderLoadingIndicator = () => (
    <ActivityIndicator
      color="#007AFF"
      size="large"
      style={styles.loader}
    />
  );

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://world.openfoodfacts.org/' }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={renderLoadingIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
}); 