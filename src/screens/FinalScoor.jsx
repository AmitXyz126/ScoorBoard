import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import GradientText from "../gradientText/GradientText";
import person from "../../assets/person.png";
import meet from "../../assets/meet.png";

const BASE_URL = "https://scoreboard.xyzdemowebsites.com";

const FinalScoor = ({ route }) => {
  const { match } = route.params;
  const matchData = match?.match;

  const homeTeam = matchData?.teamA?.[0];
  const awayTeam = matchData?.teamB?.[0];

  const homeTeamName = homeTeam?.name || "Team A";
  const awayTeamName = awayTeam?.name || "Team B";
  const homeScore = matchData?.teamA?.[1]?.scoreA ?? 0;
  const awayScore = matchData?.teamB?.[1]?.scoreB ?? 0;

  //  Handle logo URLs properly
  const homeLogo = homeTeam?.logo
    ? { uri: `${BASE_URL}${homeTeam.logo}` }
    : meet;

  const awayLogo = awayTeam?.logo
    ? { uri: `${BASE_URL}${awayTeam.logo}` }
    : person;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
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
            <Text style={styles.scoreText}>
              {homeScore < 10 ? `0${homeScore}` : homeScore}
            </Text>
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
            <Text style={styles.scoreText}>
              {awayScore < 10 ? `0${awayScore}` : awayScore}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FinalScoor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    width: "90%",
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
    fontSize: 28,
    fontWeight: "700",
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
