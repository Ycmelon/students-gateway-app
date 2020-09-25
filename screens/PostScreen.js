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
import GLOBAL from "../global";

class PostScreen extends React.Component {
  state = { loading: false, response: null };
  // response: null (unanswered), true (Yes), false (No)
  // confirmedResponse: Response is submitted to API

  postResponse(response) {
    this.setState({ loading: true, response: response });

    setTimeout(() => {
      GLOBAL.app.setState({
        snackbarVisible: true,
        snackbarMessage: "Successfully submitted response!",
      });
      this.setState({ loading: false, confirmedResponse: true });
    }, 2000);
  }

  render() {
    const post = this.props.route.params.post;
    const date_created = new Date(post.date_created * 1000).toLocaleString();
    var date_due;
    if (post.date_due) {
      date_due = new Date(post.date_due * 1000).toLocaleString();
    } else {
      date_due = null;
    }

    return (
      <View flex={1}>
        <ScrollView>
          <View style={{ margin: 16 }}>
            <Card>
              <Card.Content>
                {date_due ? (
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
                        Respond by {date_due}
                      </Text>
                    </View>
                    <Br />
                  </>
                ) : null}

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
                {post.location ? (
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={16}
                      style={{ alignSelf: "center", marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 16, marginBottom: 4 }}>
                      {post.location}
                    </Text>
                  </View>
                ) : null}

                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={16}
                    style={{ alignSelf: "center", marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 16 }}>Posted on {date_created}</Text>
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
            {post.requires_acknowledgement ? (
              <Card>
                <Card.Content>
                  {/* <Subheading>Response</Subheading> */}
                  <View style={{ flexDirection: "row" }}>
                    {this.state.confirmedResponse ? (
                      <Text>
                        You've responded with:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {this.state.response ? "Yes" : "No"}
                        </Text>
                      </Text>
                    ) : (
                      <>
                        <Button
                          flex={1}
                          mode="outlined"
                          style={{ marginRight: 16 }}
                          icon="check"
                          onPress={() => this.postResponse(true)}
                          disabled={this.state.loading}
                          loading={this.state.response == true}
                        >
                          Yes
                        </Button>
                        <Button
                          flex={1}
                          mode="outlined"
                          icon="close"
                          onPress={() => this.postResponse(false)}
                          disabled={this.state.loading}
                          loading={this.state.response == false}
                        >
                          No
                        </Button>
                      </>
                    )}
                  </View>
                </Card.Content>
              </Card>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(PostScreen);
