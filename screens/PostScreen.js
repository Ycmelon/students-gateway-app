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
  render() {
    return (
      <View flex={1}>
        <ScrollView>
          <View style={{ margin: 16 }}>
            <Card>
              <Card.Content>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  National Day Parade Preview
                </Text>
                <Text style={{ fontSize: 16 }}>RIMBokai - Y3 Bio</Text>
                <Br />
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
                  <Text style={{ fontSize: 16 }}>19th July 1996</Text>
                </View>
              </Card.Content>
            </Card>
            <Br />
            <Card>
              <Card.Content>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Event details
                </Text>
                <Text>
                  Lorem Ipsum，也称乱数假文或者哑元文本，
                  是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem
                  Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem
                  Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus
                  PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野。
                </Text>
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
          </View>
        </ScrollView>
        <Appbar style={{ bottom: 0, justifyContent: "space-between" }}>
          <Text style={{ color: "white" }}>Due: Very Soon</Text>
          <View style={{ flexDirection: "row" }}>
            <Button mode="contained" color="white">
              Yes
            </Button>
            <Button mode="contained">No</Button>
          </View>
        </Appbar>
      </View>
    );
  }
}

export default withTheme(PostScreen);
