import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../contants/Colors";
import GradientButton from "../gradientButton/GradientButton";
import GradientText from "../gradientText/GradientText";
import meet from "../../assets/meet.png"
import person from "../../assets/person.png"

const SingleMatchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Start Match</Text>

      <View style={styles.teamBox}>
        <Image
          source={ meet}
          style={styles.teamLogo}
        />
        <View>
          <Text style={styles.teamName}>Chelsea</Text>
          <Text style={styles.teamSub}>Team A</Text>
        </View>
      </View>

      <GradientText
        text="Vs"
        style={{
          fontSize: 36,
          fontWeight: "700",
          fontFamily: "Kumbh Sans",
          lineHeight: 40,
          textTransform: "capitalize",
        }}
      />

      <View style={styles.teamBox}>
        <Image
          source={ person}
          style={styles.teamLogo}
        />
        <View>
          <Text style={styles.teamName}>Melon</Text>
          <Text style={styles.teamSub}>Team B</Text>
        </View>
      </View>

      <GradientButton title="Start Match" style={styles.startText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 40,
  },
  teamBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    width: "99%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 16,
  },
  teamLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
  },
  teamSub: {
    fontSize: 14,
    color: "#777",
  },
  vsText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginVertical: 15,
  },
  startButton: {
    width: "85%",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 40,
  },
  startText: {
    color: "#fff",
    fontSize: 16,
    height: 48,
    alignSelf: "stretch",
    fontWeight: "600",
    marginTop: 288,
    borderRadius: 10,
  },
});

export default SingleMatchScreen;
