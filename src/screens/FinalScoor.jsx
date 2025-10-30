import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Animated,
} from "react-native";
import GradientText from "../gradientText/GradientText";
import person from "../../assets/person.png";
import meet from "../../assets/meet.png";
import back from "../../assets/backIcon.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMatchByCode } from "../api/auth";

const BASE_URL = "https://scoreboard.xyzdemowebsites.com";

const AnimatedScore = ({ value }) => {
  const animatedValue = useRef(new Animated.Value(value)).current;
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 600, // smooth transition duration
      useNativeDriver: false,
    }).start();
  }, [value]);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value));
    });
    return () => {
      animatedValue.removeListener(listener);
    };
  }, []);

  return (
    <Text style={styles.scoreText}>
      {displayValue < 10 ? `0${displayValue}` : displayValue}
    </Text>
  );
};

const FinalScoor = ({ route }) => {
  const navigation = useNavigation();
  const { match } = route.params;
  const [matchData, setMatchData] = useState(match?.match);
  const [refreshing, setRefreshing] = useState(false);

  // Auto reload every 3 sec
  useEffect(() => {
    const fetchUpdatedMatch = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const matchCode = matchData?.match_code;
        if (!matchCode) return;

        const latestMatch = await getMatchByCode(matchCode, token);
        if (latestMatch?.match) {
          setMatchData(latestMatch.match);
        }
      } catch (error) {
        console.log("Auto refresh error:", error);
      }
    };

    const interval = setInterval(fetchUpdatedMatch, 3000);
    return () => clearInterval(interval);
  }, [matchData?.match_code]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const matchCode = matchData?.match_code;
      if (!matchCode) return;

      const latestMatch = await getMatchByCode(matchCode, token);
      if (latestMatch?.match) {
        setMatchData(latestMatch.match);
      }
    } catch (error) {
      console.log("Manual refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [matchData?.match_code]);

  const homeTeam = matchData?.teamA?.[0];
  const awayTeam = matchData?.teamB?.[0];

  const homeTeamName = homeTeam?.name || "Team A";
  const awayTeamName = awayTeam?.name || "Team B";
  const homeScore = matchData?.teamA?.[1]?.scoreA ?? 0;
  const awayScore = matchData?.teamB?.[1]?.scoreB ?? 0;

  const homeLogo = homeTeam?.logo
    ? { uri: `${BASE_URL}${homeTeam.logo}` }
    : meet;
  const awayLogo = awayTeam?.logo
    ? { uri: `${BASE_URL}${awayTeam.logo}` }
    : person;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIMg} source={back} />
          </TouchableOpacity>
          <View>
            <Text style={styles.matchTitle}>Match ID</Text>
            <Text style={styles.matchId}>{matchData?.match_code}</Text>
          </View>
          <Image source={person} style={styles.personIcon} />
        </View>

        {/* Match status */}
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  matchData?.status === "completed"
                    ? "#2ecc71"
                    : matchData?.status === "ongoing"
                      ? "#f39c12"
                      : "#888",
              },
            ]}
          >
            {matchData?.status === "completed"
              ? "✅ Match Completed"
              : matchData?.status === "ongoing"
                ? "🏏 Match Ongoing"
                : "⏳ Waiting to Start"}
          </Text>
        </View>

        {/* Match Box */}
        <View style={styles.matchBox}>
          {/* Home Team */}
          <View style={styles.teamBlock}>
            <Image source={homeLogo} style={styles.teamImage} />
            <View style={styles.teamRow}>
              <View>
                <Text style={styles.teamName}>{homeTeamName}</Text>
                <Text style={styles.teamType}>Home</Text>
              </View>
              <AnimatedScore value={homeScore} />
            </View>
          </View>

          {/* VS Divider */}
          <View style={styles.dividerWrapper}>
            <View style={styles.line} />
            <GradientText
              text="Vs"
              style={{
                fontSize: 36,
                fontWeight: "700",
                lineHeight: 40,
                padding: 15,
              }}
            />
            <View style={styles.line} />
          </View>

          {/* Away Team */}
          <View style={styles.teamBlock}>
            <Image source={awayLogo} style={styles.teamImage} />
            <View style={styles.teamRow}>
              <View>
                <Text style={styles.teamName}>{awayTeamName}</Text>
                <Text style={styles.teamType}>Away</Text>
              </View>
              <AnimatedScore value={awayScore} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FinalScoor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  backIMg: {
    width: 28,
    height: 28,
  },
  header: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  matchId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 2,
    opacity: 0.5,
  },
  personIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  matchBox: {
    width: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  teamBlock: {
    alignItems: "center",
    marginBottom: 20,
  },
  teamImage: {
    width: 124,
    height: 124,
    borderRadius: 75,
    marginBottom: 12,
    backgroundColor: "#ddd",
  },
  teamRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  teamType: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
  },
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#B3DCFF",
  },
});
