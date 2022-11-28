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
import { StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import * as cheerio from "cheerio";
import RenderHtml from "react-native-render-html";
import { ScrollView } from "react-native-gesture-handler";

async function loadTeam(team_id) {
  const url = `https://ctftime.org/team/${team_id}`;
  const res = await fetch(url);
  const text = await res.text();
  const $ = cheerio.load(text);
  return {
    desc: $(".span10").html() + `<p>${$(".well").html()}</p>`,
    img: "https://ctftime.org/" + $(".span2 img").attr("src"),
  };
}

const data = {
  academic: false,
  primary_alias: "perfect r00t",
  name: "perfect r00t",
  rating: {
    2016: {},
    2017: {},
    2018: {},
    2019: {},
    2020: {},
    2021: {},
    2022: {
      organizer_points: 0,
      rating_points: 1161.56614237,
      rating_place: 2,
    },
    2023: {},
    2011: {},
    2012: {},
    2013: {},
    2014: {},
    2015: {},
  },
  logo: "https://ctftime.org//media/team/IMG_3687.jpeg",
  country: "",
  id: 42934,
  aliases: ["perfect r\u272a\u272a\u272at", "perfect bl00"],
};

export default function DetailTeam({ navigation, route }) {
  const [desc, setDesc] = useState({ desc: "", img: "" });
  useEffect(() => {
    loadTeam(route.params.team_id).then((desc) => {
      console.log(desc);
      setDesc(desc);
    });
  }, []);
  const { width } = useWindowDimensions();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: desc.img }} style={styles.image} marginT-50 />
        <RenderHtml
          contentWidth={width}
          source={{ html: `${desc.desc}` }}
          marginR-10
          marginL-10
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
});
