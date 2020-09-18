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
  if (cut == -1) return s;
  return s.substring(0, cut);
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
    const date = new Date(this.props.post.date_created * 1000).toLocaleString();
    const desc = cutString(this.props.post.body.replace("\\n", ""), 100);
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
            {this.props.post.dueDate && (
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
                    Respond by {this.props.post.dueDate}
                  </Text>
                </View>
                <Br />
              </>
            )}

            <Title
              style={{
                textDecorationLine: this.props.post.read ? "none" : "underline",
              }}
            >
              {this.props.post.title}
            </Title>

            <Text>
              {desc +
                (desc != this.props.post.body.replace("\\n", "") ? "..." : "")}
            </Text>
            <Text style={{ textAlign: "right", color: "grey" }}>{date}</Text>
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
