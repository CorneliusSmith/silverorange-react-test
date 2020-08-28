import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function DetailedPost() {
  return (
    <View style={styles.container}>
      <Text>DetailedPost</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
