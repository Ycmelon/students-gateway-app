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
  List,
} from "react-native-paper";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";

import { Br } from "../components";
import GLOBAL from "../global";

class HomeScreen extends React.Component {
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
            description="Logged in as 23Y..."
            left={() => <List.Icon icon="logout" />}
            onPress={() => GLOBAL.app.setState({ isSignedIn: false })}
          />
        </List.Section>
        <List.Section title="About">
          <List.Item
            title="Contact us"
            // description="Logged in as 23Y..."
            left={() => <List.Icon icon="help-circle" />}
            onPress={() =>
              Linking.openURL("mailto:23ylohy820c@student.ri.edu.sg")
            }
          />
          <List.Item
            title="About"
            // description="Logged in as 23Y..."
            left={() => <List.Icon icon="information" />}
            onPress={() => alert("beans")}
          />
        </List.Section>
      </ScrollView>
    );
  }
}

export default withTheme(HomeScreen);
