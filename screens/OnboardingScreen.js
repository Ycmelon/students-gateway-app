import React from "react";
import { View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { StatusBar } from "expo-status-bar";

class OnboardingScreen extends React.Component {
  state = {
    username: null,
    password: null,
  };
  webview = null;

  render() {
    return (
      <SafeAreaView
        style={{
          margin: 16,
          alignSelf: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <StatusBar style="dark" />
        <View
          style={{
            alignSelf: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 200, width: 300, alignSelf: "center" }}
            source={{
              uri:
                "https://static.vecteezy.com/system/resources/thumbnails/000/238/880/original/dog-lover-happy-family-vector-flat-illustration.png",
            }}
          />
          <Br />
          <Title>Let's get started</Title>
          <Text>Log in with your GOTO ID</Text>
          <Br />
          <Button
            mode="contained"
            // style={{ width: 200 }}
            onPress={() => this.props.navigation.navigate("AuthenticateScreen")}
          >
            Log in
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(OnboardingScreen);
