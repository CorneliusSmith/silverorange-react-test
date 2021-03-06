import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  ProfileScreenNavigationProp,
  Props,
  State,
} from '../types/PostListTypes';

export const sortReverseChronologically = (json: any) => {
  json.sort(
    (later: any, older: any) =>
      new Date(older.publishedAt).getTime() -
      new Date(later.publishedAt).getTime()
  );
  return json;
};

export const summaryMaker = (summary: string) => {
  if (summary) {
    return summary.toString().replace('#', '');
  }
  return '';
};

export class PostList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      isFiltered: false,
      authorName: '',
    };
  }

  componentDidMount() {
    fetch('http://10.0.0.215:4000/posts')
      .then((response) => response.json())
      .then((json) => {
        json = sortReverseChronologically(json);
        this.setState({
          isLoaded: true,
          data: json,
        });
      });
  }

  filterByAuthor(name: string, posts: any[]) {
    posts = posts.filter((post) => post.author.name == name);
    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => this.goToDetailedPost(item.title, item.body)}
          >
            <View style={styles.item}>
              <Text style={{ fontWeight: 'bold' }}>
                Author: {item.author.name}
              </Text>
              <Text> Title: {item.title} </Text>
              <Text>
                {' '}
                Date Published: {new Date(item.publishedAt).toDateString()}{' '}
              </Text>
              <Text> Summary: {summaryMaker(item.body.split('\n', 1))} </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  goToDetailedPost(title: string, body: string) {
    // ! force unwraps the navigation prop since its optional to pass in for jest testing
    this.props.navigation!.navigate('Details', { title: title, body: body });
  }

  render() {
    var { isLoaded, data, isFiltered, authorName } = this.state;

    if (!isLoaded) {
      return (
        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold' }}>
            If The Activity Indictator Doesnt Go Away In 5 Secconds An Error
            Occured Please Reload App
          </Text>
          <ActivityIndicator />
        </View>
      );
    }

    if (isFiltered) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                isFiltered: false,
                authorName: '',
              })
            }
          >
            <Text style={{ fontWeight: 'bold' }}>
              Tap Here To Return To Unfiltered List
            </Text>
          </TouchableOpacity>
          {this.filterByAuthor(authorName, data)}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold' }}>
          Tap An Authors Name To View Only Their Posts
        </Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.goToDetailedPost(item.title, item.body)}
            >
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isFiltered: true,
                      authorName: item.author.name,
                    })
                  }
                >
                  <Text style={{ fontWeight: 'bold' }}>
                    Author: {item.author.name}
                  </Text>
                </TouchableOpacity>
                <Text> Title: {item.title} </Text>
                <Text>
                  Date Published: {new Date(item.publishedAt).toDateString()}
                </Text>
                <Text> Summary: {summaryMaker(item.body.split('\n', 1))} </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
export default PostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  item: {
    marginTop: 30,
    padding: 30,
    backgroundColor: 'silver',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'orange',
  },
});
