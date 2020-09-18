import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-community/async-storage";

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
  SettingsScreen,
} from "./screens";
import GLOBAL from "./global.js";

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#006a49",
    accent: "#970026",
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

// TaskManager.defineTask("getNotifications", () => {
//   console.log("Get notifications!");
//   fetch(apiUrl + "/getback").then((response) => {
//     return BackgroundFetch.Result.NewData;
//   });
// });

export default class App extends React.Component {
  state = { isSignedIn: false };

  constructor(props) {
    super(props);
    GLOBAL.app = this;
    AsyncStorage.getItem("@username").then((value) => {
      if (value) {
        GLOBAL.username = value;
        this.setState({ isSignedIn: true });
      }
    });
  }

  componentDidMount() {
    // BackgroundFetch.registerTaskAsync("getNotifications", {
    //   startOnBoot: true,
    //   stopOnTerminate: false,
    //   minimumInterval: 60,
    // }).then(() => {
    //   console.log("Registered");
    // });
  }

  render() {
    return (
      <PaperProvider theme={dark ? DarkTheme_ : LightTheme}>
        <NavigationContainer theme={dark ? DarkTheme_ : LightTheme}>
          <StatusBar
            style="light" // backgroundColor="#004e2f"
          />

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
                  options={{ title: "Log in" }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Tabs"
                  component={Tabs}
                  options={{ title: "Students Gateway" }}
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
        {
          // Future
          /* <Tab.Screen
          name="2FA?"
          component={HomeScreen}
          options={{ tabBarIcon: "key-variant" }}
        /> */
        }
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ tabBarIcon: "settings" }}
        />
      </Tab.Navigator>
    );
  }
}
