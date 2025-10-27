import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import GradientButton from "../gradientButton/GradientButton";
import sidelogo from "../../assets/sideLogo.png";
import person from "../../assets/person.png";
import shareicon from "../../assets/shareIcon.png";
import GradientText from "../gradientText/GradientText";
import copy from "../../assets/copy.png";
import defaultLogo from "../../assets/userss.png";
import { endMatch, updateScore } from "../api/auth";

const HomeEditScore = ({ navigation, route }) => {
  const { teamA, teamB, match } = route.params || {};

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [loading, setLoading] = useState(false);

  //  Get team logo
  const getTeamLogo = (team) => {
    if (!team?.logo) return null;
    const base = process.env.EXPO_PUBLIC_API_URL;
    const logoData = team.logo;
    if (logoData?.formats?.thumbnail?.url)
      return `${base}${logoData.formats.thumbnail.url}`;
    if (logoData?.formats?.small?.url)
      return `${base}${logoData.formats.small.url}`;
    return `${base}${logoData.url}`;
  };

  //  Update Score API
  const handleUpdateScore = async (newHomeScore, newAwayScore) => {
    console.log(" handleUpdateScore called with:", {
      newHomeScore,
      newAwayScore,
      matchId: match?.match.match_code,
    });

    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(" Token from storage:", token);

      if (!match?.match?.id) {
        Alert.alert("Error", "Match ID not found");
        return;
      }

      const payload = {
        scoreA: newHomeScore,
        scoreB: newAwayScore,
      };

      console.log(" Sending payload to API:", payload);
      setLoading(true);

      const res = await updateScore(match?.match?.id, payload, token);
      console.log("API response received:", res);

      setLoading(false);
    } catch (error) {
      console.log(" API error:", error);
      setLoading(false);
    }
  };

  const handleEndMatch = async () => {
      // console.log(" handleEndMatch called");
    try {
      const token = await AsyncStorage.getItem("userToken");

      const matchId = match?.match?.id;
            // console.log(" Match ID:", matchId);

      if (!matchId) {
        console.log("Match ID not found, stopping execution");
        Alert.alert("Error", "Match ID not found");
        return;
      }

      const res = await endMatch(match?.match?.id, token);
      console.log(" Match End Response:", res);
      Alert.alert("Success", "Match ended successfully!");
      navigation.goBack();
    } catch (error) {
      console.log(" End Match Error:", error);
      Alert.alert("Error", error?.message || "Failed to end match");
    }
  };
  // console.log(match.match.match_code,"match ff id")

  //  Home team controls
  const increaseHome = async () => {
    console.log(" increaseHome pressed");
    const newScore = homeScore + 1;
    setHomeScore(newScore);
    await handleUpdateScore(newScore, awayScore);
  };

  const decreaseHome = async () => {
    console.log(" decreaseHome pressed");
    const newScore = homeScore > 0 ? homeScore - 1 : 0;
    setHomeScore(newScore);
    await handleUpdateScore(newScore, awayScore);
  };

  //  Away team controls
  const increaseAway = async () => {
    console.log(" increaseAway pressed");
    const newScore = awayScore + 1;
    setAwayScore(newScore);
    await handleUpdateScore(homeScore, newScore);
  };

  const decreaseAway = async () => {
    console.log(" decreaseAway pressed");
    const newScore = awayScore > 0 ? awayScore - 1 : 0;
    setAwayScore(newScore);
    await handleUpdateScore(homeScore, newScore);
  };

  const teamALogo = getTeamLogo(teamA);
  const teamBLogo = getTeamLogo(teamB);

  return (
    <View style={styles.container}>
      {/*  Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={sidelogo} style={styles.logo} />
        </TouchableOpacity>
        <Image source={person} style={styles.personIcon} />
      </View>

      {/*  Match Info */}
      <View style={styles.header}>
        <View>
          <Text style={styles.matchTitle}>Match ID</Text>
          <View style={styles.copyContainer}>
            <Text style={styles.matchId}>{match?.match?.match_code}</Text>
            <Image source={copy} style={styles.copy} />
          </View>
        </View>
        <TouchableOpacity onPress={() => Alert.alert("Share", "Coming Soon!")}>
          <Image style={styles.share} source={shareicon} />
        </TouchableOpacity>
      </View>

      {/*  Score Box */}
      <View style={styles.matchBox}>
        {/* Team A */}
        <View style={styles.teamContainer}>
          <View style={styles.firstImg}>
            <Image
              source={teamALogo ? { uri: teamALogo } : defaultLogo}
              style={styles.teamLogo}
            />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{teamA?.name || "Team A"}</Text>
              <Text style={styles.teamType}>Home</Text>
            </View>
          </View>

          <View style={styles.scoreControl}>
            <TouchableOpacity
              style={styles.scoreButton}
              onPress={decreaseHome}
              disabled={loading}
            >
              <Ionicons name="remove" size={20} color="#3F8CFF" />
            </TouchableOpacity>

            <Text style={styles.scoreText}>
              {homeScore < 10 ? `0${homeScore}` : homeScore}
            </Text>

            <TouchableOpacity
              style={styles.scoreButton}
              onPress={increaseHome}
              disabled={loading}
            >
              <Ionicons name="add" size={20} color="#3F8CFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* VS */}
        <GradientText
          text="Vs"
          style={{ fontSize: 30, fontWeight: "700", marginVertical: 25 }}
        />

        {/* Team B */}
        <View style={styles.teamContainer}>
          <View style={styles.firstImg}>
            <Image
              source={teamBLogo ? { uri: teamBLogo } : defaultLogo}
              style={styles.teamLogo}
            />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{teamB?.name || "Team B"}</Text>
              <Text style={styles.teamType}>Away</Text>
            </View>
          </View>

          <View style={styles.scoreControl}>
            <TouchableOpacity
              style={styles.scoreButton}
              onPress={decreaseAway}
              disabled={loading}
            >
              <Ionicons name="remove" size={20} color="#3F8CFF" />
            </TouchableOpacity>

            <Text style={styles.scoreText}>
              {awayScore < 10 ? `0${awayScore}` : awayScore}
            </Text>

            <TouchableOpacity
              style={styles.scoreButton}
              onPress={increaseAway}
              disabled={loading}
            >
              <Ionicons name="add" size={20} color="#3F8CFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*  Footer */}
      <View style={styles.footer}>
        <GradientButton
          title="Over The Match"
          // onPress={() => Alert.alert("Match", "Match Over!")}
          onPress={handleEndMatch}
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
  share: { borderRadius: 4, width: 44, height: 44 },
  topBar: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: { width: 40, height: 40, resizeMode: "contain" },
  personIcon: { width: 40, height: 40, borderRadius: 20 },
  copyContainer: { flexDirection: "row" },
  copy: { width: 20, height: 20, marginLeft: 5 },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  matchTitle: { fontSize: 16, fontWeight: "600", color: "#000" },
  matchId: { fontSize: 14, color: "#666", marginTop: 3 },
  matchBox: {
    width: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    marginTop: 15,
    paddingVertical: 15,
    alignItems: "center",
  },
  teamContainer: { alignItems: "center" },
  firstImg: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 8,
    width: 290,
  },
  teamLogo: { width: 125, height: 125, borderRadius: 75, marginRight: 15 },
  teamInfo: { flexDirection: "column" },
  teamName: { fontSize: 18, fontWeight: "600", color: "#000" },
  teamType: { color: "#777", fontSize: 14, marginTop: 4 },
  scoreControl: {
    width: 320,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 2,
    elevation: 3,
    marginTop: 15,
  },
  scoreButton: { padding: 8 },
  scoreText: { fontSize: 17, fontWeight: "400", color: "#414141" },
  footer: { width: "85%", marginTop: 30 },
});
