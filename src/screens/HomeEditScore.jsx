import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GradientButton from "../gradientButton/GradientButton";
import Colors from "../contants/Colors";
import sidelogo from "../../assets/sideLogo.png";
import person from "../../assets/person.png";
import meet from "../../assets/meet.png";
import shareicon from "../../assets/shareIcon.png";
import GradientText from "../gradientText/GradientText";
import copy from "../../assets/copy.png";

const HomeEditScore = ({ navigation }) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const increaseHome = () => setHomeScore(homeScore + 1);
  const decreaseHome = () => setHomeScore(homeScore > 0 ? homeScore - 1 : 0);
  const increaseAway = () => setAwayScore(awayScore + 1);
  const decreaseAway = () => setAwayScore(awayScore > 0 ? awayScore - 1 : 0);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("")}
        >
          <Image source={sidelogo} style={styles.logo} />
        </TouchableOpacity>
        <Image source={person} style={styles.personIcon} />
      </View>
      {/* Match Info */}
      <View style={styles.header}>
        <View>
          <Text style={styles.matchTitle}>Match ID</Text>
          <View style={styles.copyContainer}>
            <Text style={styles.matchId}>1234 1234 1234</Text>
            <Image source={copy} style={styles.copy}></Image>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ViewLogin")}>
          <Image style={styles.share} source={shareicon} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.matchBox}>
        {/* Home Team */}
        <View style={styles.teamContainer}>
          <View style={styles.firstImg}>
            <Image source={meet} style={styles.teamLogo} />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>Chelsea</Text>
              <Text style={styles.teamType}>Home</Text>
            </View>
          </View>

          <View style={styles.scoreControl}>
            <TouchableOpacity style={styles.scoreButton} onPress={decreaseHome}>
              <Ionicons name="remove" size={20} color="#3F8CFF" />
            </TouchableOpacity>

            <Text style={styles.scoreText}>
              {homeScore < 10 ? `0${homeScore}` : homeScore}
            </Text>

            <TouchableOpacity style={styles.scoreButton} onPress={increaseHome}>
              <Ionicons name="add" size={20} color="#3F8CFF" />
            </TouchableOpacity>
          </View>
        </View>
        {/* VS Text */}
        <GradientText
          text="Vs"
          style={{
            fontSize: 30,
            fontWeight: "700",
            fontFamily: "Kumbh Sans",
            marginVertical: 25,
            lineHeight: 40,
            textTransform: "capitalize",
          }}
        />
        fontSize: 28, fontWeight: "700", color: Colors.primary, marginVertical:
        25,
        {/* Away Team */}
        <View style={styles.teamContainer}>
          <View style={styles.firstImg}>
            <Image source={person} style={styles.teamLogo} />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>Melon</Text>
              <Text style={styles.teamType}>Away</Text>
            </View>
          </View>

          <View style={styles.scoreControl}>
            <TouchableOpacity style={styles.scoreButton} onPress={decreaseAway}>
              <Ionicons name="remove" size={20} color="#3F8CFF" />
            </TouchableOpacity>

            <Text style={styles.scoreText}>
              {awayScore < 10 ? `0${awayScore}` : awayScore}
            </Text>

            <TouchableOpacity style={styles.scoreButton} onPress={increaseAway}>
              <Ionicons name="add" size={20} color="#3F8CFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <GradientButton
          title="Over The match"
          onPress={() => alert("Match Over!")}
          type="secondary"
        />
      </View>
    </View>
  );
};

export default HomeEditScore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 70,
  },

  share: {
    borderRadius: 4,
    padding: 5,
    width: 44,
    height: 44,
  },
  topBar: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  personIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  copyContainer: {
    flexDirection: "row",
  },
  copy: {
    width: 20,
    height: 20,
    marginLeft: 1,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  matchId: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  matchBox: {
    width: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    marginTop: 15,
    paddingVertical: 15,
    alignItems: "center",
  },
  teamContainer: {
    alignItems: "center",
  },
  firstImg: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 0,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    elevation: 2,
    width: 290,
    justifyContent: "flex-start",
  },
  teamLogo: {
    width: 125,
    height: 125,
    borderRadius: 30,
    marginRight: 15,
  },
  teamInfo: {
    flexDirection: "column",
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  teamType: {
    color: "#777",
    fontSize: 14,
    marginTop: 4,
  },
  scoreControl: {
    width: 320,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: 15,
  },
  scoreButton: {
    padding: 8,
  },
  scoreText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#414141",
  },

  footer: {
    width: "85%",
    marginTop: 30,
  },
});
