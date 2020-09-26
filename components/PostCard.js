import React from "react";
import { View } from "react-native";
import {
  Card,
  Text,
  Title,
  Subheading,
  useTheme,
  Divider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Br from "./Br";

function cutString(s, n) {
  var cut = s.indexOf(" ", n);
  if (cut == -1) return { desc: s, cut: false };
  return { desc: s.substring(0, cut), cut: s != s.substring(0, cut) };
}

class Detail extends React.PureComponent {
  render() {
    return (
      <View style={{ flexDirection: "row", marginRight: 8 }}>
        <MaterialCommunityIcons
          name={this.props.icon}
          size={16}
          color="grey"
          style={{ alignSelf: "center" }}
        />
        <Text style={{ color: "grey" }}>&nbsp;&nbsp;{this.props.text}</Text>
      </View>
    );
  }
}

class PostCard extends React.PureComponent {
  componentDidMount() {}

  render() {
    const date_created = new Date(
      this.props.post.date_created * 1000
    ).toLocaleString();

    var date_due;
    if (this.props.post.date_due) {
      date_due = new Date(this.props.post.date_due * 1000).toLocaleString();
    } else {
      date_due = null;
    }

    const { desc, cut } = cutString(
      this.props.post.body.replace(/(\r\n|\n|\r)/gm, " "),
      100
    );

    return (
      <>
        <Card
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              post: this.props.post,
            })
          }
        >
          <Card.Content>
            {date_due && this.props.post.acknowledged === null ? (
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

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textDecorationLine: this.props.post.viewed
                  ? "none"
                  : "underline",
              }}
            >
              {this.props.post.title}
            </Text>

            <Text>{desc + (cut ? "..." : "")}</Text>
            <Text style={{ textAlign: "right", color: "grey" }}>
              {date_created}
            </Text>
            <Br />
            <Divider />
            <Br />

            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <Detail icon="account-edit" text={this.props.post.author_name} />
              <Detail icon="account-group" text={this.props.post.group_name} />
            </View>
          </Card.Content>
        </Card>
        <Br />
      </>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const theme = useTheme();
  return <PostCard {...props} navigation={navigation} theme={theme} />;
}
