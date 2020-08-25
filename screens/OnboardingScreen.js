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
        <View
          style={{
            alignSelf: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ height: 100, width: 100, alignSelf: "center" }}
            source={{
              uri:
                "https://lh3.googleusercontent.com/04qDFFVuV1EnVaOxtlrRC216Tgg-jxZnVA_DAkLrVtMKGRa4ZcCX019KDkOxz9uLGFED=s360-rw",
            }}
          />
          <Br />
          <Title>Let's get started</Title>
          <Text>Log in with your GOTO ID</Text>
          <Br />
          <Button
            mode="contained"
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
