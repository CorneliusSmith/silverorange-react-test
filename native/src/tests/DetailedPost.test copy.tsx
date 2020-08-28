import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Platform } from 'react-native';
import { DetailedPost } from '../components/DetailedPost';
import { RootStackParamList } from '../types/RootStackParamListType';
import { RouteProp } from '@react-navigation/native';
import 'isomorphic-fetch';
import 'react-native-gesture-handler/jestSetup';

jest.useFakeTimers();
describe('<DetailedPost/>', async () => {
  const tree = renderer.create(<DetailedPost />).toJSON();

  test('if it renders without crashing', async () => {
    await act(async () => {
      expect(tree).toMatchSnapshot();
    });
  });

  test('if it matches the snapshot', async () => {
    await act(async () => {
      expect(tree).toMatchSnapshot();
    });
  });
});
