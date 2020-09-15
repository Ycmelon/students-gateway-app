import React from "react";
import {
  withTheme,
  Title,
  Subheading,
  Card,
  Appbar,
  Button,
} from "react-native-paper";
import { View, ScrollView, Text } from "react-native";
import { Br } from "../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

class PostScreen extends React.Component {
  state = { loading: false };

  postResponse(response) {
    this.setState({ loading: true });
    console.log(response);
  }

  render() {
    const post = this.props.route.params.post;
    const date = new Date(post.date * 1000).toLocaleString();

    return (
      <View flex={1}>
        <ScrollView>
          <View style={{ margin: 16 }}>
            <Card>
              <Card.Content>
                <>
                  <View
                    style={{
                      backgroundColor: "red",
                      alignSelf: "flex-start",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Respond by {post.due_date}
                    </Text>
                  </View>
                  <Br />
                </>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {post.title}
                </Text>
                <Br />
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="account-edit"
                    size={16}
                    style={{ alignSelf: "center", marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16, marginBottom: 4 }}>
                    {post.author_name}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={16}
                    style={{ alignSelf: "center", marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16, marginBottom: 4 }}>
                    {post.group_name}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={16}
                    style={{ alignSelf: "center", marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16, marginBottom: 4 }}>
                    Biology Lab 1, level 3
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={16}
                    style={{ alignSelf: "center", marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16 }}>Posted on {date}</Text>
                </View>
              </Card.Content>
            </Card>
            <Br />
            <Card>
              <Card.Content>
                <Subheading>Details</Subheading>
                <View style={{ flexDirection: "column" }}>
                  {post.body.split("\\n").map((line, index) => {
                    return <Text key={index}>{line}</Text>;
                  })}
                </View>
              </Card.Content>
            </Card>
            {/* <Br />
            <Card>
              <WebView
                injectedJavaScript={`document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("form")[0].outerHTML; document.getElementsByClassName("freebirdFormviewerViewHeaderHeader exportHeader")[0].remove(); document.getElementsByTagName("body")[0].style.backgroundColor = "#fff"`}
                source={{
                  uri:
                    "https://docs.google.com/forms/d/e/1FAIpQLSfzQL870XGB0JTm0J2jpLTUSVC7-JvEdP03An77qY00QRWi8g/viewform",
                }}
                style={{ height: 10000 }}
              />
            </Card> */}
            <Br />
            <Card>
              <Card.Content>
                {/* <Subheading>Response</Subheading> */}
                <View style={{ flexDirection: "row" }}>
                  {false ? (
                    <Text>You've responded with: Yes</Text>
                  ) : (
                    <>
                      <Button
                        flex={1}
                        mode="outlined"
                        style={{ marginRight: 16 }}
                        icon="check"
                        onPress={() => this.postResponse(true)}
                        disabled={this.state.loading}
                        loading={this.state.loading}
                      >
                        Yes
                      </Button>
                      <Button
                        flex={1}
                        mode="outlined"
                        icon="close"
                        onPress={() => this.postResponse(false)}
                        disabled={this.state.loading}
                        loading={this.state.loading}
                      >
                        No
                      </Button>
                    </>
                  )}
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(PostScreen);
