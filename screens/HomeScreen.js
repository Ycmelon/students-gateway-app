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
} from "react-native-paper";
import { WebView } from "react-native-webview";

import { Br } from "../components";

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
        <View style={{ margin: 16 }}>
          <ActivityIndicator />
          {/* <Card onPress={() => this.props.navigation.navigate("PostScreen")}>
            <Card.Content>
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
                  Respond by 18 Jun
                </Text>
              </View>
              <Br />
              <Title>Biology lab</Title>

              <Text>
                Hey guys, please go to the lab for thursday's lesson lorem
                ipsum!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              </Text>
              <Br />
              <Divider />
              <Br />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Subheading>RIMBokai - Y3 Bio</Subheading>
                <Subheading style={{ textAlign: "right" }}>17 Jun</Subheading>
              </View>
            </Card.Content>
          </Card>
          <Br />
          <Card onPress={() => null}>
            <Card.Content>
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
                  Respond by 18 Jun
                </Text>
              </View>
              <Br />
              <Title>Biology lab</Title>

              <Text>
                Hey guys, please go to the lab for thursday's lesson lorem
                ipsum!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              </Text>
              <Br />
              <Divider />
              <Br />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Subheading>RIMBokai - Y3 Bio</Subheading>
                <Subheading style={{ textAlign: "right" }}>17 Jun</Subheading>
              </View>
            </Card.Content>
          </Card>
          <Br />
          <Card onPress={() => null}>
            <Card.Content>
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
                  Respond by 18 Jun
                </Text>
              </View>
              <Br />
              <Title>Biology lab</Title>

              <Text>
                Hey guys pwease check out Haowei's recordwing on
                RIMBank!!!11!!!!1!!
              </Text>
              <Br />
              <Divider />
              <Br />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Subheading>RIMBokai - Y3 Bio</Subheading>
                <Subheading style={{ textAlign: "right" }}>17 Jun</Subheading>
              </View>
            </Card.Content>
          </Card>
          <Br /> */}
        </View>
      </ScrollView>
    );
  }
}

export default withTheme(HomeScreen);
