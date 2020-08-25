import React from "react";
import { View } from "react-native";

export default class Br extends React.PureComponent {
  render() {
    return <View style={{ height: this.props.half ? 8 : 16 }} />;
  }
}
