import React from "react";
import { View, ScrollView, Alert, FlatList } from "react-native";
import {
  withTheme,
  Card,
  Title,
  Subheading,
  Text,
  Button,
  Divider,
  List,
} from "react-native-paper";
import { Updates } from "expo";
import AsyncStorage from "@react-native-community/async-storage";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";

import { Br } from "../components";
import GLOBAL from "../global";

class SettingsScreen extends React.Component {
  state = { username: "" };

  componentDidMount() {
    AsyncStorage.getItem("@username").then((value) => {
      this.setState({ username: value });
    });
  }

  render() {
    return (
      // <View flex={1}>
      //   <WebView
      //     injectedJavaScript={`document.getElementsByTagName("body")[0].style.backgroundColor="#fff"`}
      //     flex={1}
      //     source={{
      //       uri:
      //         "https://docs.google.com/forms/d/e/1FAIpQLSfTLkxLiS_Ci8azarprVylecsPZECD_q10Xm2Hp2vssqqkLig/viewform?usp=sf_link",
      //     }}
      //   ></WebView>
      // </View>
      <ScrollView>
        <List.Section title="Account">
          <List.Item
            title="Log out"
            description={"Currently logged in as " + this.state.username}
            left={() => <List.Icon icon="logout" />}
            onPress={() => {
              AsyncStorage.removeItem("@username");
              GLOBAL.app.setState({ isSignedIn: false });
            }}
          />
        </List.Section>
        <List.Section title="Help">
          <List.Item
            title="Show tutorial again"
            description="Lol puss puss"
            left={() => <List.Icon icon="comment" />}
            onPress={() => {
              AsyncStorage.removeItem("@tutorial_home");
              // AsyncStorage.removeItem("@username");
              // AsyncStorage.removeItem("@username");
              // AsyncStorage.removeItem("@username");
              Updates.reload();
            }}
          />
          <List.Item
            title="Contact us"
            description="Issues or feedback"
            left={() => <List.Icon icon="help-circle" />}
            onPress={() =>
              Linking.openURL("mailto:23ylohy820c@student.ri.edu.sg")
            }
          />
        </List.Section>
        <List.Section title="About">
          <List.Item
            title="About"
            // description="About Students' Gateway"
            left={() => <List.Icon icon="information" />}
            onPress={() =>
              Alert.alert(
                "About",
                "Students Gateway\nby Loh Yu Chen & Chi Junxiang 2020\nY3 CEP Final Project\n\nBased off Parents Gateway by MOE"
              )
            }
          />
          <List.Item
            title="View on GitHub"
            description="Don't criticise the bad code"
            left={() => <List.Icon icon="github-circle" />}
            onPress={() =>
              Linking.openURL("https://github.com/SoInstant/students-gateway")
            }
          />
        </List.Section>
      </ScrollView>
    );
  }
}

export default withTheme(SettingsScreen);
