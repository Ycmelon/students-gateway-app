import React from "react";
import { ScrollView, Alert } from "react-native";
import { withTheme, List } from "react-native-paper";

import { Updates } from "expo";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-community/async-storage";

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
                "RI Students Gateway\nby Loh Yu Chen & Chi Junxiang 2020\nY3 CEP Final Project\n\nBased off Parents Gateway by MOE"
              )
            }
          />
          <List.Item
            title="View on GitHub"
            description="We do not accept criticism"
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
