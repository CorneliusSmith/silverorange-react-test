import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function PostList() {
  return (
    <View style={styles.container}>
      <Text>PostList</Text>
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
