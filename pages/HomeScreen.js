import React, { Component } from "react";
import { StyleSheet, Alert, FlatList } from "react-native";
import {
  Colors,
  BorderRadiuses,
  View,
  Image,
  ListItem,
  Text,
} from "react-native-ui-lib";
import CountryFlag from "react-native-country-flag";
import DetailTeam from "./DetailTeam";
import { createStackNavigator } from "@react-navigation/stack";
import axios from 'axios';

class Home extends Component {
  keyExtractor = (item) => item.team_id;

  constructor() {
    super();
    this.state = {
      teams: [],
      teamPhoto : {},
      teamCountry: {}
    }
  }

  componentDidMount() {
    const url = "https://ctftime.org/api/v1/top/";
    axios.get(url).then((res) => {
      console.log(res.data["2022"])
      this.setState({...this.state, teams: res.data["2022"]});
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.teams !== prevState.teams) {
      this.state.teams.map((team) => {
        const url = `https://ctftime.org/api/v1/teams/${team.team_id}/`;
        axios.get(url).then((res) => {
          console.log(res.data.logo);
          console.log(res.data.country);
          this.setState((prevState2) => {
            return {
              ...prevState2,
              teamPhoto: {
                ...prevState2.teamPhoto,
                [team.team_id]: res.data.logo
              },
              teamCountry: {
                ...prevState2.teamCountry,
                [team.team_id]: res.data.country
              }
            }
          })
        })
      })
    }
  }

  renderRow(row, idx) {
    return (
      <View>
        <ListItem
          // @ts-expect-error
          activeBackgroundColor={Colors.grey60}
          activeOpacity={0.3}
          height={77.5}
          //onPress={() => Alert.alert(`pressed on order #${id + 1}`)}
          onPress={() => this.props.navigation.navigate("DetailTeam", {team_id: row.team_id})}
        >
          <ListItem.Part left>
            <Image source={{ uri: this.state.teamPhoto[row.team_id] }} style={styles.image} />
          </ListItem.Part>
          <ListItem.Part
            middle
            column
            containerStyle={[styles.border, { paddingRight: 17 }]}
          >
            <ListItem.Part containerStyle={{ marginBottom: 3 }}>
              <Text
                grey10
                text70
                style={{ flex: 1, marginRight: 10 }}
                numberOfLines={1}
              >
                {row.team_name}
              </Text>
              <Text grey10 text70 style={{ marginTop: 2 }}>
                {row.points.toFixed(2)}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ flex: 1, marginRight: 10 }}
                text90
                grey40
                numberOfLines={1}
              >{`#${idx+1} Place`}</Text>
              {
                this.state.teamCountry[row.team_id] &&
                <CountryFlag isoCode={this.state.teamCountry[row.team_id]} size={16} />
              }
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </View>
    );
  }

  render() {
    return (
      <>
        <Text grey10 text60 marginL-10 marginT-10 center>
          Top 10 Scoreboard
        </Text>
        <FlatList
          data={this.state.teams}
          renderItem={({ item, index }) => this.renderRow(item, index)}
          keyExtractor={this.keyExtractor}
        />
      </>
    );
  }
}

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="DetailTeam"
        component={DetailTeam}
        options={{ title: 'Team ' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey70,
  },
});
