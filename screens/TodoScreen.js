import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import {
  withTheme,
  Card,
  Title,
  Subheading,
  Text,
  Button,
  Divider,
  ActivityIndicator,
  Avatar,
  Banner,
} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { WebView } from "react-native-webview";
import { apiUrl } from "../constants";
import GLOBAL from "../global";
import { Br, PostCard } from "../components";

class TodoScreen extends React.Component {
  state = { ready: false, refreshing: false, tutorialVisible: false, page: 1 };
  componentDidMount() {
    AsyncStorage.getItem("@tutorial_todo").then((value) => {
      if (!value) {
        this.setState({ tutorialVisible: true });
      }
    });
    this.getPosts();
  }

  getPosts(page = 1) {
    this.setState({ refreshing: true });
    fetch(
      apiUrl +
        "/posts/home?username=" +
        encodeURIComponent(GLOBAL.username) +
        "&page=" +
        encodeURIComponent(page)
    ).then((response) => {
      response.json().then((responseJson) => {
        // console.log(responseJson);
        if (page == 1) {
          this.setState({
            data: responseJson.data,
            refreshing: false,
            ready: true,
          });
        } else {
          // console.log("Concat! " + responseJson.data.length + " " + page);
          this.setState({
            refreshing: false,
            data: this.state.data.concat(responseJson.data),
          });
        }
      });
    });
  }

  getPostsPaginate() {
    if (this.state.ready) {
      console.log("Paginate");
      this.setState({ page: this.state.page + 1 }, () =>
        this.getPosts(this.state.page)
      );
    }
  }

  render() {
    return (
      <>
        <FlatList
          ListHeaderComponent={
            <Banner
              visible={this.state.tutorialVisible}
              actions={[
                {
                  label: "Dismiss",
                  onPress: () => {
                    AsyncStorage.setItem("@tutorial_todo", "done");
                    this.setState({ tutorialVisible: false });
                  },
                },
              ]}
              icon={({ size }) => <Avatar.Icon size={size} icon="comment" />}
            >
              This is the todo screen: Unread notifications / notifications you
              have yet to reply to will show up here.
            </Banner>
          }
          ListHeaderComponentStyle={{ margin: -16, marginBottom: 16 }}
          contentContainerStyle={{ padding: 16 }}
          onRefresh={() => this.getPosts()}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.getPostsPaginate()}
          data={this.state.data}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  }
}

export default withTheme(TodoScreen);
