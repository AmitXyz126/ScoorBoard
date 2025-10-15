import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../contants/Colors";
import GradientButton from "../gradientButton/GradientButton";
import GradientText from "../gradientText/GradientText";
import person from "../../assets/person.png";
import meet from "../../assets/meet.png";
import backIcon from "../../assets/backIcon.png";
import plusIcon from "../../assets/plus.png";
import downArrow from "../../assets/downArrow.png";

const TournamentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={backIcon} style={styles.backIcon}></Image>
      </TouchableOpacity>

      <Text style={styles.title}>Tournament Select Teams</Text>

      {/* Team A */}
      <View style={styles.teamBox}>
        <Image source={meet} style={styles.teamLogo} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>Chelsea</Text>
          <Text style={styles.teamSub}>Team A</Text>
        </View>
        {/* <Ionicons name="chevron-down" size={20} color="#555" /> */}
        <Image source={downArrow} style={styles.downArrow}></Image>
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

      {/* Team B */}
      <View style={styles.teamBox}>
        <Image source={person} style={styles.teamLogo} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>Melon</Text>
          <Text style={styles.teamSub}>Team B</Text>
        </View>
        {/* <Ionicons name="chevron-down" size={20} color="#555" /> */}
        <Image source={downArrow} style={styles.downArrow}></Image>
      </View>

      {/* Footer Buttons */}
      <View style={styles.footerButtons}>
        <GradientButton
          title="Start Match"
          onPress={() => navigation.navigate("HomeEditScore")}
          style={styles.gradientBtn}
        />

        <TouchableOpacity
          style={styles.newTeamButton}
          onPress={() => navigation.navigate("AddTeamScreen")}
        >
          <Image
            source={plusIcon}
            style={{ width: 18, height: 18, marginRight: 6 }}
          />
          <Text style={styles.newTeamText}>New Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    marginTop: 26,
  },
  teamBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    width: "85%",
    padding: 24,
    borderRadius: 12,
    marginBottom: 15,
    marginTop: 15,
  },
  teamLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  teamInfo: { flex: 1 },
  teamName: { fontSize: 18, fontWeight: "600" },
  teamSub: { fontSize: 14, color: "#777" },
  vsText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
    marginVertical: 15,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 288,
  },
  gradientBtn: {
    flex: 1,
    marginRight: 10,
  },
  newTeamButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  newTeamText: {
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 16,
  },
  downArrow: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    flexShrink: 0,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 4,
  },
});

export default TournamentScreen;
