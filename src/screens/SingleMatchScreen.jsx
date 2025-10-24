import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Colors from "../contants/Colors";
import GradientButton from "../gradientButton/GradientButton";
import GradientText from "../gradientText/GradientText";
import backIcon from "../../assets/backIcon.png";
import downArrow from "../../assets/downArrow.png";
import plusIcon from "../../assets/plus.png";

import { useFocusEffect } from "@react-navigation/native";
import { getTeams } from "../api/auth";
import defaultLogo from "../../assets/userss.png";

const SingleMatchScreen = ({ navigation }) => {
  const [teamsList, setTeamsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teamA, setTeamA] = useState({});
  const [teamB, setTeamB] = useState({});
  const [visibleModal, setVisibleModal] = useState(null);

  //  Fetch teams from API
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await getTeams();
      // console.log("Fetched Teams:", response);
      setTeamsList(response || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTeams();
    }, [])
  );

  const handleSelectTeam = (team) => {
    // console.log(team, "team");
    if (visibleModal === "A") setTeamA(team);
    else if (visibleModal === "B") setTeamB(team);
    setVisibleModal(null);
  };

  const teamALogo = teamA?.logo
    ? `${process.env.EXPO_PUBLIC_API_URL}${
        teamA.logo.formats
          ? teamA.logo.formats.thumbnail
            ? teamA.logo.formats.thumbnail.url
            : teamA.logo.formats?.small?.url
          : teamA.logo.url
      }`
    : null;

  console.log("teamALogo", teamALogo);

  const teamBLogo = teamB?.logo
    ? `${process.env.EXPO_PUBLIC_API_URL}${
        teamB.logo.formats
          ? teamB.logo.formats.thumbnail
            ? teamB.logo.formats.thumbnail.url
            : teamB.logo.formats?.small?.url
          : teamB.logo.url
      }`
    : null;

  console.log("teamBLogoB", teamBLogo);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Start Match</Text>

      {/* Team A Box */}
      <View style={styles.teamBox}>
        <View style={styles.teamInfo}>
          {/* <Image source={{ uri: teamALogo }} style={styles.teamLogo} /> */}
          <Image
            source={teamALogo ? { uri: teamALogo } : defaultLogo}
            style={styles.teamLogo}
          />

          <View>
            <Text style={styles.teamName}>{teamA.name || "Select Team A"}</Text>
            <Text style={styles.teamSub}>Team A</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setVisibleModal("A")}>
          <Image source={downArrow} style={styles.downArrow} />
        </TouchableOpacity>
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

      {/* Team B Box */}
      <View style={styles.teamBox}>
        <View style={styles.teamInfo}>
          {/* <Image source={{ uri: teamBLogo }} style={styles.teamLogo} /> */}
          <Image
            source={teamBLogo ? { uri: teamBLogo } : defaultLogo}
            style={styles.teamLogo}
          />
          <View>
            <Text style={styles.teamName}>{teamB.name || "Select Team B"}</Text>
            <Text style={styles.teamSub}>Team B</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setVisibleModal("B")}>
          <Image source={downArrow} style={styles.downArrow} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.manage} onPress={() => navigation.navigate("TeamManagementScreen")}>
          Manage your Teams
        </Text>
      </TouchableOpacity>

      {/* Footer Buttons */}
      <View style={styles.footerButtons}>
        <GradientButton
          title="Start Match"
          onPress={() => navigation.navigate("")}
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

      {/* Modal for Selecting Team */}
      <Modal transparent visible={!!visibleModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Team</Text>

            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <FlatList
                data={teamsList}
                keyExtractor={(item) => item.id?.toString()}
                renderItem={({ item }) => {
                  const teamName = item.name || "Unnamed";
                  const isDisabled =
                    (visibleModal === "A" && teamName === teamB.name) ||
                    (visibleModal === "B" && teamName === teamA.name);

                  return (
                    <TouchableOpacity
                      disabled={isDisabled}
                      style={[
                        styles.teamItem,
                        isDisabled && {
                          backgroundColor: "#f0f0f0",
                          opacity: 0.5,
                        },
                      ]}
                      onPress={() => handleSelectTeam(item)}
                    >
                      <Text
                        style={[
                          styles.teamItemText,
                          isDisabled && { color: "#999" },
                        ]}
                      >
                        {teamName}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            <TouchableOpacity
              onPress={() => setVisibleModal(null)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  manage:{
fontSize:16,
color:"#068EFF",
  fontWeight: "700",
  fontStyle:"normal",
  marginTop:20,

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
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 40,
    marginTop: 24,
  },
  teamBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    width: "99%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 16,
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingHorizontal: 28,
    // paddingVertical: 0,
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
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%%",
    marginTop: 288,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  teamItem: {
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  teamItemText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    alignItems: "center",
  },
  closeText: {
    color: Colors.primary || "#007BFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SingleMatchScreen;
