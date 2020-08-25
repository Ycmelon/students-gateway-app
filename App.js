import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Provider as PaperProvider,
  Appbar,
  DefaultTheme,
  DarkTheme,
} from "react-native-paper";

import {
  HomeScreen,
  PostScreen,
  AuthenticateScreen,
  OnboardingScreen,
} from "./screens";

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#900",
    accent: "#ADE1F5",
  },
};

const DarkTheme_ = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#de0000", // TODO make brighter
    accent: "#ADE1F5",
  },
};

const dark = false;
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class App extends React.Component {
  state = { isSignedIn: false };

  render() {
    return (
      <PaperProvider theme={dark ? DarkTheme_ : LightTheme}>
        <NavigationContainer theme={dark ? DarkTheme_ : LightTheme}>
          <StatusBar style="light" />
          <Stack.Navigator
            // mode="modal"
            headerMode="screen"
            // initialRouteName="Authenticate"
            screenOptions={{
              header: ({ scene, previous, navigation }) => (
                <Appbar.Header>
                  {previous ? (
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                  ) : null}
                  <Appbar.Content
                    title={
                      scene.descriptor.options.title !== undefined
                        ? scene.descriptor.options.title
                        : scene.route.name
                    }
                  />
                  {/* <Appbar.Action icon="magnify" />
                <Appbar.Action icon="dots-vertical" /> */}
                </Appbar.Header>
              ),
            }}
          >
            {!this.state.isSignedIn ? (
              <>
                <Stack.Screen
                  name="OnboardingScreen"
                  component={OnboardingScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AuthenticateScreen"
                  component={AuthenticateScreen}
                  initialParams={{
                    complete: () => this.setState({ isSignedIn: true }),
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Tabs"
                  component={Tabs}
                  options={{ title: "Home" }}
                />
                <Stack.Screen
                  name="PostScreen"
                  component={PostScreen}
                  options={{ title: "Post" }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

class Tabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        shifting={false}
        tabBarOptions={{
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: "home" }}
        />
        <Tab.Screen
          name="Todo"
          component={HomeScreen}
          options={{ tabBarIcon: "format-list-checkbox" }}
        />
        <Tab.Screen
          name="2FA?"
          component={HomeScreen}
          options={{ tabBarIcon: "key-variant" }}
        />
        <Tab.Screen
          name="Settings"
          component={HomeScreen}
          options={{ tabBarIcon: "settings" }}
        />
      </Tab.Navigator>
    );
  }
}
