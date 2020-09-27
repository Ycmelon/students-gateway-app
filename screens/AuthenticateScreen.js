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
  HelperText,
} from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { WebView } from "react-native-webview";
import { apiUrl } from "../constants";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { Br } from "../components";
import GLOBAL from "../global";
import { StatusBar } from "expo-status-bar";

class AuthenticateScreen extends React.Component {
  state = {
    username: null,
    password: null,
    error: false,
  };
  webview = null;

  login() {
    const username = this.state.username.toLowerCase();
    const password = this.state.password;

    this.setState({ error: false });
    if (username && password) {
      this.setState({ loading: true });
      fetch(apiUrl + "/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "students-gateway-admin",
          username: username.toLowerCase(),
          password: password,
        }),
      })
        .then((response) => {
          response.json().then((responseJson) => {
            if (response.status == 200) {
              if (responseJson.user_type != "admin") {
                // Success
                registerForPushNotificationsAsync().then((token) =>
                  fetch(
                    apiUrl +
                      "/users/setExpoPushToken?username=" +
                      encodeURIComponent(username) +
                      "&push_token=" +
                      encodeURIComponent(token)
                  ).then((response) => {
                    console.log(response.status);
                  })
                );
                AsyncStorage.setItem("@username", username).then(() => {
                  GLOBAL.username = username;
                  GLOBAL.app.setState({ isSignedIn: true });
                });
              } else {
                this.setState({
                  error:
                    "You have an admin account! Please use the website instead.",
                });
              }
            } else if (response.status == 403) {
              this.setState({ error: "Incorrect username/password!" });
            } else if (responseJson.message) {
              this.setState({
                error: "Error (response): " + responseJson.message,
              });
            } else {
              this.setState({ error: "Unknown error: " + response.status });
            }
          });
        })
        .catch((e) => this.setState({ error: "Unknown error: " + e }))
        .then(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ error: "Please fill in all fields!" });
    }
  }

  render() {
    return (
      <View style={{ margin: 16 }}>
        <StatusBar style="light" />
        <TextInput
          label="Username"
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
          autoCompleteType="username"
        />
        <Br />
        <TextInput
          label="Password"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          autoCompleteType="password"
          secureTextEntry={true}
          // keyboardAppearance
        />
        <HelperText type="error" visible={this.state.error}>
          {this.state.error}
        </HelperText>
        <Br />
        <Button
          mode="contained"
          onPress={() => this.login()}
          loading={this.state.loading}
          disabled={this.state.loading}
        >
          Login
        </Button>
      </View>
    );
  }
}

export default withTheme(AuthenticateScreen);

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
