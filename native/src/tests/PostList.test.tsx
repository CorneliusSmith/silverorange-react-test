import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Platform } from 'react-native';
import { PostList, sortReverseChronologically} from '../components/PostList';
import 'isomorphic-fetch';
import 'react-native-gesture-handler/jestSetup';

jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');


describe('<PostList/>', () => {
  const tree = renderer.create(<PostList/>).toJSON();
  test('if it renders without crashing', async () => {
    await act(async ()=>{
      expect(tree).not.toBeNull();
    });
  });

  test('if it matches the snapshot', async () => {
    await act(async ()=>{
      expect(tree).toMatchSnapshot();
    });
  });

});


describe('sortReverseChronologically', () => {
  const postDataOg = [
    {
      title: 'post1',
      body: 'yello',
      author: {
        name: 'numbah1',
        id: '1',
      },
      id: 'a',
      publishedAt: new Date('08-28-2020'),
    },
    {
      title: 'post2',
      body: 'hello',
      author: {
        name: 'numbah2',
        id: '2',
      },
      id: 'b',
      publishedAt: new Date('08-29-2020'),
    },
    {
      title: 'post3',
      body: 'chello',
      author: {
        name: 'numbah3',
        id: '3',
      },
      id: 'c',
      publishedAt: new Date('08-30-2020'),
    },
  ];

  const postDataReverseChronological = [
    {
      title: 'post3',
      body: 'chello',
      author: {
        name: 'numbah3',
        id: '3',
      },
      id: 'c',
      publishedAt: new Date('08-30-2020'),
    },
    {
      title: 'post2',
      body: 'hello',
      author: {
        name: 'numbah2',
        id: '2',
      },
      id: 'b',
      publishedAt: new Date('08-29-2020'),
    },
    {
      title: 'post1',
      body: 'yello',
      author: {
        name: 'numbah1',
        id: '1',
      },
      id: 'a',
      publishedAt: new Date('08-28-2020'),
    },
  ];
  
  test('if it sorts correctly',  () => {
    expect(sortReverseChronologically(postDataOg)).toStrictEqual(postDataReverseChronological)
  });

});