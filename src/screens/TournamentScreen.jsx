import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../contants/Colors";
import GradientButton from "../gradientButton/GradientButton";
import GradientText from "../gradientText/GradientText";
import backIcon from "../../assets/backIcon.png";
import plusIcon from "../../assets/plus.png";
import downArrow from "../../assets/downArrow.png";
import defaultLogo from "../../assets/userss.png";
import { getTeams, createMatch } from "../api/auth";  
import { useFocusEffect } from "@react-navigation/native";

const TournamentScreen = ({ navigation }) => {
  const [teamsList, setTeamsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teamA, setTeamA] = useState({});
  const [teamB, setTeamB] = useState({});
  const [visibleModal, setVisibleModal] = useState(null);
  const [starting, setStarting] = useState(false);  

  // Fetch teams
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await getTeams();
      setTeamsList(response || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      Alert.alert("Error", "Failed to fetch teams. Try again.");
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
    if (visibleModal === "A") setTeamA(team);
    else if (visibleModal === "B") setTeamB(team);
    setVisibleModal(null);
  };

  // Logo builder (same as SingleMatch)
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

  const teamALogo = getTeamLogo(teamA);
  const teamBLogo = getTeamLogo(teamB);

  //  Start Match (Tournament)
  const handleStartMatch = async () => {
    if (!teamA?.id || !teamB?.id) {
      Alert.alert("Error", "Please select both Team A and Team B!");
      return;
    }

    try {
      setStarting(true);
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        Alert.alert("Error", "No user token found. Please login again.");
        setStarting(false);
        return;
      }

      const matchData = {
        teamA: teamA.id,
        teamB: teamB.id,
       type: "Tournament" ,  
      };

      console.log("Match Data Sent:", matchData);
      const response = await createMatch(matchData, userToken);
      console.log("Tournament Match Created:", response);

      Alert.alert("Success", "Tournament match started successfully!");
      navigation.navigate("HomeEditScore", { teamA, teamB, match: response });
    } catch (error) {
      console.error(
        "Tournament Start Error:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.error?.message ||
          "Failed to start tournament match"
      );
    } finally {
      setStarting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Tournament Select Teams</Text>

      {/* TEAM A */}
      <View style={styles.teamBox}>
        <Image
          source={teamALogo ? { uri: teamALogo } : defaultLogo}
          style={styles.teamLogo}
        />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{teamA.name || "Select Team A"}</Text>
          <Text style={styles.teamSub}>Team A</Text>
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

      {/* TEAM B */}
      <View style={styles.teamBox}>
        <Image
          source={teamBLogo ? { uri: teamBLogo } : defaultLogo}
          style={styles.teamLogo}
        />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{teamB.name || "Select Team B"}</Text>
          <Text style={styles.teamSub}>Team B</Text>
        </View>
        <TouchableOpacity onPress={() => setVisibleModal("B")}>
          <Image source={downArrow} style={styles.downArrow} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("TeamManagementScreen")}
      >
        <Text style={styles.manage}>Manage your Teams</Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <View style={styles.footerButtons}>
        <GradientButton
          title={starting ? "Starting..." : "Start  Match"}
          onPress={handleStartMatch}
          style={styles.gradientBtn}
          disabled={starting}
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

      {/* MODAL */}
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
  },
  backButton: { position: "absolute", top: 60, left: 20 },
  backIcon: { width: 24, height: 24 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 16, marginTop: 26 },
  teamBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    width: "85%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    marginTop: 15,
  },
  manage: { fontSize: 16, color: "#068EFF", fontWeight: "700", marginTop: 20 },
  teamLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  teamInfo: { flex: 1 },
  teamName: { fontSize: 18, fontWeight: "600" },
  teamSub: { fontSize: 14, color: "#777" },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 288,
  },
  gradientBtn: { flex: 1, marginRight: 10 },
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
  downArrow: { width: 32, height: 32 },
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
  teamItemText: { fontSize: 16, textAlign: "center" },
  closeButton: { marginTop: 15, alignItems: "center" },
  closeText: { color: Colors.primary, fontWeight: "600", fontSize: 16 },
});

export default TournamentScreen;
