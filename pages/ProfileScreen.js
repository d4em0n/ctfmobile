import { View, Text, StyleSheet } from "react-native";

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Simple mobile version for ctftime</Text>
      <Text>Data provided from <Text style={{color: "blue"}}>ctftime.org</Text></Text>
      <Text>Created by Muhammad Alifa Ramdhan - 2022</Text>
      <Text>CTFMobile version 0.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});


export default ProfileScreen;