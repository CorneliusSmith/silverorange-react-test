import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Platform } from 'react-native';
import {
  PostList,
  sortReverseChronologically,
  summaryMaker,
} from '../components/PostList';
import 'isomorphic-fetch';
import 'react-native-gesture-handler/jestSetup';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('<PostList/>', () => {
  const tree = renderer.create(<PostList />).toJSON();
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

describe('summaryMaker', () => {
  test('if it trims the # from the summary correctly', () => {
    const summary = ' # Welcome to the Summary';
    const trimmedSummary = '  Welcome to the Summary';
    expect(summaryMaker(summary)).toStrictEqual(trimmedSummary);
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

    test('if it sorts correctly', () => {
      expect(sortReverseChronologically(postDataOg)).toStrictEqual(
        postDataReverseChronological
      );
    });
  });

  //Ran out of time to finish filling out the FlatList that should be returned, but if time permitted
  //I would make sure the returned FlatList Matched a premade one
  // describe('filterByAuthor', () => {
  // const postDataOg = [
  //   {
  //     title: 'post1',
  //     body: 'yello',
  //     author: {
  //       name: 'numbah1',
  //       id: '1',
  //     },
  //     id: 'a',
  //     publishedAt: new Date('08-28-2020'),
  //   },
  //   {
  //     title: 'post2',
  //     body: 'hello',
  //     author: {
  //       name: 'numbah3',
  //       id: '2',
  //     },
  //     id: 'b',
  //     publishedAt: new Date('08-29-2020'),
  //   },
  //   {
  //     title: 'post3',
  //     body: 'chello',
  //     author: {
  //       name: 'numbah3',
  //       id: '3',
  //     },
  //     id: 'c',
  //     publishedAt: new Date('08-30-2020'),
  //   },
  // ];
  // const postDataFiltered = <FlatList data={[{"author": {"id": "2", "name": "numbah3"}, "body": "hello", "id": "b", "publishedAt": 2020-08-29T04:00:00.000Z, "title": "post2"}, {"author": {"id": "3", "name": "numbah3"}, "body": "chello", "id": "c", "publishedAt": 2020-08-30T04:00:00.000Z, "title": "post3"}]}/>;
  //   test('if it filters the list correctly',  () => {
  //     expect(PostList.prototype.filterByAuthor("numbah3",postDataOg)).toBe(postDataFiltered)
  //   });
  // });
});
