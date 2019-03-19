import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import TabBar from './src/components/tabbar';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", backgroundColor: '#FA002E' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

class ExploreScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", backgroundColor: 'green' }}>
        <Text>Explore Screen</Text>
      </View>
    );
  }
}

class UserScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", backgroundColor: 'blue' }}>
        <Text>User Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Explore: {
    screen: ExploreScreen
  },
  User: {
    screen: UserScreen
  },
  Home1: {
    screen: HomeScreen,
  },
},{
  tabBarComponent: props => <TabBar {...props} />
});

export default createAppContainer(AppNavigator);