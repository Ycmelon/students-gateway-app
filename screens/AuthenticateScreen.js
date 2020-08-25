import React from "react";
import { View, ScrollView } from "react-native";
import {
  withTheme,
  Card,
  Title,
  Subheading,
  Text,
  Button,
  Divider,
  ActivityIndicator,
  TextInput,
} from "react-native-paper";
import { WebView } from "react-native-webview";
import { apiUrl } from "../constants";

import { Br } from "../components";

class AuthenticateScreen extends React.Component {
  state = {
    username: null,
    password: null,
  };
  webview = null;

  login() {
    if (this.state.username && this.state.password) {
      fetch(apiUrl + "/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "students-gateway-admin",
          username: this.state.username.toLowerCase(),
          password: this.state.password,
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            this.props.route.params.complete();
          } else if (response.status == 403) {
            alert("Incorrect username/password!");
          } else {
            alert("Unknown error: " + response.status);
          }
        })
        .catch((e) => alert("Unknown error: " + e));
    } else {
      alert("Please fill in all inputs!");
    }
  }

  render() {
    return (
      <View style={{ margin: 16 }}>
        <TextInput
          label="Username"
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <Br />
        <TextInput
          label="Password"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Br />
        <Button mode="contained" onPress={() => this.login()}>
          Login
        </Button>
      </View>
    );
  }
}

export default withTheme(AuthenticateScreen);
