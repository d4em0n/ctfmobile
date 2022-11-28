import {
  Colors,
  Card,
  BorderRadiuses,
  View,
  Image,
  ListItem,
  Text,
} from "react-native-ui-lib";
import React, { Component, useEffect, useState } from "react";
import {
  Linking,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import * as cheerio from "cheerio";
import { ScrollView } from "react-native-gesture-handler";

async function loadLogo(id) {
  const url = `https://ctftime.org/event/${id}`;
  const res = await fetch(url);
  const text = await res.text();
  const $ = cheerio.load(text);
  return "https://ctftime.org/" + $(".span2 img").attr("src");
}

function DetailEvent({ navigation, route }) {
  const [logo, setLogo] = useState("");
  useEffect(() => {
    loadLogo(route.params.id).then((img) => {
      console.log(img);
      setLogo(img);
    });
  }, []);
  const start = new Date(route.params.start);
  const finish = new Date(route.params.finish);
  const status = route.params.onsite === false ? "Online" : "Onsite";
  const statusColor = status === "Online" ? Colors.green30 : Colors.red30;
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short",
    weekday: "short",
  };
  const startDate = `${start.toLocaleString("id-ID", options)} WIB`;
  const finishDate = `${finish.toLocaleString("id-ID", options)} WIB`;
  //const urlFormat = `https://ctftime.org/static/images/ct/${row.format_id}.png`
  return (
    <ScrollView>
      <View style={styles.container} paddingB-20>
        <Image source={{ uri: logo }} style={styles.image} marginT-30/>
        <View style={{ textAlign: "left" }}>
          <Text marginT-10>
            {startDate} - {finishDate}
          </Text>
          <Text marginT-10 style={{ textAlign: "justify" }}>
            {route.params.description}
          </Text>
          <Text marginT-10>
            Format :{" "}
            <Text color={statusColor} style={{ fontWeight: "bold" }}>
              {status}
            </Text>{" "}
            {route.params.format}
          </Text>
          <Text marginT-10>
            Official URL :
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL(route.params.url)}
            >
              {" "}
              {route.params.url}{" "}
            </Text>
          </Text>
          <Text marginT-10>
            Rating weight :{" "}
            <Text style={{ fontWeight: "bold" }}>
              {route.params.weight.toFixed(2)}
            </Text>
          </Text>
          <Text marginT-10> Organizers : </Text>
          {route.params.organizers.map((item,i) => (<Text key={i}> • {item.name}</Text>))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
    marginLeft: "10%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
});

export default DetailEvent;
