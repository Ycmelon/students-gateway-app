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

class HomeScreen extends React.Component {
  state = { refreshing: false, tutorialVisible: false };
  componentDidMount() {
    AsyncStorage.getItem("@tutorial_home").then((value) => {
      if (!value) {
        this.setState({ tutorialVisible: true });
      }
    });
    this.getPosts();
  }

  getPosts() {
    this.setState({ refreshing: true });
    fetch(
      apiUrl +
        "/posts/home?username=" +
        encodeURIComponent(GLOBAL.username) +
        "&page=1"
    ).then((response) => {
      response.json().then((responseJson) => {
        this.setState({ data: responseJson.data, refreshing: false });
      });
    });
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
                    AsyncStorage.setItem("@tutorial_home", "done");
                    this.setState({ tutorialVisible: false });
                  },
                },
              ]}
              icon={({ size }) => <Avatar.Icon size={size} icon="comment" />}
            >
              This is the home screen: all notifications will show up here.
            </Banner>
          }
          ListHeaderComponentStyle={{ margin: -16, marginBottom: 16 }}
          contentContainerStyle={{ padding: 16 }}
          onRefresh={() => this.getPosts()}
          refreshing={this.state.refreshing}
          onEndReached={null}
          data={this.state.data}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  }
}

export default withTheme(HomeScreen);
