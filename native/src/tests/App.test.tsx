import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Platform } from 'react-native';
import { App, getHeaderColorForPlatform } from '../App';
import 'isomorphic-fetch';

jest.useFakeTimers();

describe('<App/>', () => {
  const tree = renderer.create(<App />).toJSON();
  test('if it renders without crashing', async () => {
    await act(async () => {
      expect(tree).not.toBeNull();
    });
  });

  test('if it matches the snapshot', async () => {
    await act(async () => {
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('getHeaderColorForPlatform', () => {
  test('if it returns the right colors', () => {
    Platform.OS = 'android';
    const resultAndroid: string = getHeaderColorForPlatform();

    Platform.OS = 'ios';
    const resultiOS: string = getHeaderColorForPlatform();

    expect(resultAndroid).toBe('#ff8159');
    expect(resultiOS).toBe('#f4511e');
  });
});
