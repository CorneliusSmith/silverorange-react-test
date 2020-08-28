import React,  { Component, FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamListType';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-renderer';

type Props = {
  route?: RouteProp<RootStackParamList, 'Details'>;
};

//React Native Markdown Renderer causes warnings due to components needing to be updated.
//In production I would go in and fix the warnings myself, but for the purpose of this test
//it could take a 3-4 hour task and turn it into a 5 hour one. The time is better spent completing the task itself.

export const DetailedPost: FC<Props> = ({ route }) => {
  const { title } = route!.params;
  const { body } = route!.params;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}> {title} </Text>
        <Markdown>{body}</Markdown> 
    </ScrollView>
    </View>
  );
};

export default DetailedPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    marginTop: 10,
    padding: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
  },
});
