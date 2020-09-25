import React from "react";
import { View, ScrollView, FlatList, Image } from "react-native";
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
  state = { ready: false, refreshing: false, tutorialVisible: false, page: 1 };
  componentDidMount() {
    // Get whether home or todo screen
    this.setState({ type: this.props.route.params.type }, () => {
      AsyncStorage.getItem("@tutorial_" + this.state.type).then((value) => {
        if (!value) {
          this.setState({ tutorialVisible: true });
        }
      });
      this.getPosts();
    });
  }

  getPosts(page = 1) {
    this.setState({ refreshing: true });
    fetch(
      apiUrl +
        "/posts/home?username=" +
        encodeURIComponent(GLOBAL.username) +
        "&page=" +
        encodeURIComponent(page) +
        "&todo=" +
        (this.state.type == "todo" ? 1 : 0)
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
        if (responseJson.data.length == 0) {
          this.setState({ page: this.state.page - 1 });
        }
      });
    });
  }

  getPostsPaginate() {
    if (this.state.ready) {
      console.log("Paginate " + this.state.page);
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
                    AsyncStorage.setItem(
                      "@tutorial_" + this.state.type,
                      "done"
                    );
                    this.setState({ tutorialVisible: false });
                  },
                },
              ]}
              icon={({ size }) => <Avatar.Icon size={size} icon="comment" />}
            >
              {this.state.type == "home"
                ? "This is the home screen: All notifications will show up here."
                : "This is the todo screen: Unread notifications / notifications you have yet to reply to will show up here."}
            </Banner>
          }
          ListHeaderComponentStyle={{ margin: -16, marginBottom: 16 }}
          contentContainerStyle={{ padding: 16 }}
          onRefresh={() =>
            this.setState({ page: 1 }, () => {
              this.getPosts();
            })
          }
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.1}
          onEndReached={() => this.getPostsPaginate()}
          data={this.state.data}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <ActivityIndicator animating={this.state.refreshing} />
          }
          ListEmptyComponent={
            this.state.data ? (
              <View
                flex={1}
                style={{
                  alignContent: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/emptystates/nice.png")}
                  style={{ height: 200, width: 200 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  {this.state.type == "todo"
                    ? "No pending tasks"
                    : "No posts available"}
                </Text>
              </View>
            ) : null
          }
        />
      </>
    );
  }
}

export default withTheme(HomeScreen);
