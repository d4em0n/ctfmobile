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
import axios from "axios";
import "intl";
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/id';
import DetailEvent from "./DetailEvent";
import { createStackNavigator } from "@react-navigation/stack";

const orders = [
  {
    name: "NO Escape CTF",
    formattedPrice: "Jeopardy",
    inventory: {
      trackingMethod: "status",
      status: "Online",
      quantity: "00.0",
    },
    mediaUrl:
      "https://static.wixstatic.com/media/d911269bdf7972c9a59ba30440cb3789.jpg_128",
  },
  {
    name: "HITCON CTF",
    formattedPrice: "Jeopardy",
    inventory: {
      trackingMethod: "status",
      status: "Online",
      quantity: "0.00",
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_5c6d2cd3b71a41caa54309301e1dd0d7.jpg_128",
  },
  {
    name: "Glacier CTF",
    formattedPrice: "Attack-Defense",
    inventory: {
      trackingMethod: "status",
      status: "Onsite",
      quantity: "22.9",
    },
    mediaUrl:
      "https://static.wixstatic.com/media/cda177_7153ff06297c484498f9d6662e26d6d5.jpg_128",
  },
];

class Upcoming extends Component {
  keyExtractor = (item) => item.id;

  constructor() {
    super();
    this.state = {
      events: [],
      eventLogo: {},
      limit: 0
    }
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  fetchMoreData(n) {
    this.setState((prevState) => {
      return {
        ...prevState,
        limit: prevState.limit+n
      };
    })
  }

  componentDidMount() {
    this.fetchMoreData(10);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.limit > prevState.limit) {
      const url = `https://ctftime.org/api/v1/events/?limit=${this.state.limit}&start=${Date.now()}`
      axios.get(url).then((res) => {
        this.setState({...this.state, events: res.data});
      })
    }
  }

  //componentDidUpdate(prevProps, prevState) {
  //  if(this.state.events !== prevState.events) {
  //    this.state.events.map((event) => {
  //      const url = `https://ctftime.org/api/v1/events/${event.id}/`;
  //      axios.get(url)
  //      .then((res) => {
  //        console.log(`${res.data.logo} ${event.title}`);
  //        this.setState((prevState2) => {
  //          return {
  //            ...prevState2,
  //            eventLogo: {
  //              ...prevState2.eventLogo,
  //              [event.id]: res.data.logo
  //            },
  //          }
  //        })
  //      })
  //      .catch((error) => {
  //        console.log(`${event.title} no logo`)
  //        return error;
  //      })
  //    })
  //  }
  //}

  renderRow(row, id) {
    const status = row.onsite === false ? "Online" : "Onsite";
    const statusColor = status === "Online" ? Colors.green30 : Colors.red30;
    const options = {hour: 'numeric', minute: "numeric", day: 'numeric', month: 'short', weekday:"short"}
    const start = new Date(row.start);
    const finish = new Date(row.finish);
    const dateformat = `${start.toLocaleString("id-ID", options)} WIB - ${finish.toLocaleString("id-ID", options)} WIB`
    const urlFormat = `https://ctftime.org/static/images/ct/${row.format_id}.png`

    return (
      <View>
        <ListItem
          // @ts-expect-error
          activeBackgroundColor={Colors.grey60}
          activeOpacity={0.3}
          height={77.5}
          onPress={() => this.props.navigation.navigate("DetailEvent", row )}
        >
          <ListItem.Part left>
            <Image source={{ uri: urlFormat }} style={styles.image} />
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
                {row.title}
              </Text>
              <Text grey10 text70 style={{ marginTop: 2 }}>
                {row.format}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ marginRight: 10 }}
                text90
                numberOfLines={1}
              ><Text color={Colors.yellow10}>{row.weight.toFixed(2)}</Text> Weight</Text>
              <Text text90 color={statusColor} numberOfLines={1}>
                {status}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ flex: 1, marginRight: 10 }}
                text90
                grey40
                numberOfLines={1}
                marginT-4
              >
                {dateformat}
              </Text>
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
          Upcoming Events
        </Text>
        <FlatList
          data={this.state.events}
          renderItem={({ item, index }) => this.renderRow(item, index)}
          keyExtractor={this.keyExtractor}
          onEndReached={() => this.fetchMoreData(5)}
          onEndReachedThreshold={0.2}
        />
      </>
    );
  }
}

const Stack = createStackNavigator();

export default function UpcomingScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UpcomingScreen"
        component={Upcoming}
      />
      <Stack.Screen
        name="DetailEvent"
        component={DetailEvent}
        options={{ title: 'Event' }}
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
