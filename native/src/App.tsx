import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/RootStackParamListType';
import { PostList } from './components/PostList';
import { DetailedPost } from './components/DetailedPost';

const RootStack = createStackNavigator<RootStackParamList>();

//Gets Platform Specific Header color. Darker Orange For iOS. Lighter Orange For Android.
export const getHeaderColorForPlatform = () => {
  if (Platform.OS === 'ios') {
    return "#f4511e";
  }
  return "#ff8159";
};
export function App() {

  var headerColor = getHeaderColorForPlatform();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: headerColor,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
          headerTintColor: 'white',
        }}
      >
        <RootStack.Screen name="Home" component={PostList} />
        <RootStack.Screen name="Details" component={DetailedPost} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  safeView: {
    flex: 1,
  },
});