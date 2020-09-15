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
import Br from "./Br";

class PostCard extends React.PureComponent {
  componentDidMount() {}

  render() {
    const date = new Date(this.props.post.date * 1000).toLocaleString();
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

            <Title>{this.props.post.title}</Title>

            <View style={{ flexDirection: "column" }}>
              {this.props.post.body.split("\\n").map((line, index) => {
                return <Text key={index}>{line}</Text>;
              })}
            </View>
            <Br />
            <Divider />
            <Br />
            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <Text>
                {this.props.post.author_name} — {this.props.post.group_name}
              </Text>
              <Text style={{ textAlign: "right" }}>{date}</Text>
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
