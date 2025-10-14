import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import person from "../../assets/person.png";
import meet from "../../assets/meet.png";
import GradientText from "../gradientText/GradientText";

const FinalScoor = () => {
  const homeScore = 1;
  const awayScore = 2;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.matchTitle}>Match ID</Text>
          <Text style={styles.matchId}>1234 1234 12354</Text>
        </View>
        <Image source={person} style={styles.personIcon} />
      </View>

      {/* Match Box */}
      <View style={styles.matchBox}>
        {/* Home Team */}
        <View style={styles.teamBlock}>
          <Image source={meet} style={styles.teamImage} />
          <View style={styles.teamRow}>
            <View>
              <Text style={styles.teamName}>Chelsea</Text>
              <Text style={styles.teamType}>Home</Text>
            </View>
            <Text style={styles.scoreText}>
              {homeScore < 10 ? `0${homeScore}` : homeScore}
            </Text>
          </View>
        </View>

        {/* VS */}
        <View style={styles.dividerWrapper}>
          <View style={styles.line} />

          <GradientText
            text="Vs"
            style={{
              fontSize: 36,
              fontWeight: "700",
              fontFamily: "Kumbh Sans",
              lineHeight: 40,
              textTransform: "capitalize",
              padding: 15,
            }}
          />
          <View style={styles.line} />
        </View>

        {/* Away Team */}
        <View style={styles.teamBlock}>
          <Image source={person} style={styles.teamImage} />
          <View style={styles.teamRow}>
            <View>
              <Text style={styles.teamName}>Melon</Text>
              <Text style={styles.teamType}>Team B</Text>
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
  matchTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  matchId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 2,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
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
  vsText: {
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "600",
    color: "#377DFF",
  },
});
