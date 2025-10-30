import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../contants/Colors";
import { getCompletedMatches } from "../api/auth";

const BASE_URL = "https://scoreboard.xyzdemowebsites.com";

const MatchHistoryScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollY = new Animated.Value(0);

  // Fetch completed matches
  useEffect(() => {
    const fetchCompletedMatches = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");
        const data = await getCompletedMatches(token);
        console.log("✅ Completed Matches Data:", data);
        setMatches(data || []);
      } catch (error) {
        console.error("❌ Failed to fetch completed matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedMatches();
  }, []);

  // Render each match card
  const renderItem = ({ item, index }) => {
    const translateY = scrollY.interpolate({
      inputRange: [-1, 0, 100 * index, 100 * (index + 2)],
      outputRange: [0, 0, 0, -20],
    });

    const opacity = scrollY.interpolate({
      inputRange: [-1, 0, 100 * index, 100 * (index + 0.5)],
      outputRange: [1, 1, 1, 0],
    });

    const teamALogo = item.teamA?.logo?.url
      ? { uri: `${BASE_URL}${item.teamA.logo.url}` }
      : require("../../assets/person.png");

    const teamBLogo = item.teamB?.logo?.url
      ? { uri: `${BASE_URL}${item.teamB.logo.url}` }
      : require("../../assets/person.png");

    const winnerName =
      item?.winner?.name ||
      item?.winner?.team_name ||
      (typeof item.winner === "string" ? item.winner : "N/A");

    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Match ID Row */}
        <View style={styles.matchRow}>
          <Text style={styles.matchIdLabel}>Match ID </Text>
          <Text style={styles.matchIdValue}>{item.match_code}</Text>
        </View>

        {/* Team vs Team Row */}
        <View style={styles.row}>
          {/* Team A */}
          <View style={styles.teamContainer}>
            <Image source={teamALogo} style={styles.teamLogo} />
            <Text style={styles.teamName}>
              {item.teamA?.name || "Team A"} ({item.teamA?.score ?? 0})
            </Text>
            <Text style={styles.teamSub}>Team A</Text>
          </View>

          {/* VS Text */}
          <Text style={styles.vs}>VS</Text>

          {/* Team B */}
          <View style={styles.teamContainer}>
            <Image source={teamBLogo} style={styles.teamLogo} />
            <Text style={styles.teamName}>
              {item.teamB?.name || "Team B"} ({item.teamB?.score ?? 0})
            </Text>
            <Text style={styles.teamSub}>Team B</Text>
          </View>
        </View>

        {/* Winner Text */}
        <Text style={styles.winnerText}>
          🏆 Won {winnerName} by{" "}
          {item.winBy ? item.winBy.toString().padStart(2, "0") : "00"}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Title */}
      <View style={styles.topRow}>
        <Text style={styles.recentText}>Completed Matches</Text>
      </View>

      {/* Loader or List */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <Animated.FlatList
          data={matches}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

export default MatchHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  recentText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#212121",
  },

  // Match Card
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  matchIdLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212121",
  },
  matchIdValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212121",
    marginLeft: 4,
    opacity: 0.5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamContainer: {
    alignItems: "center",
    width: "38%",
  },
  teamLogo: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginBottom: 6,
    backgroundColor: "#fff",
  },
  teamName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  teamSub: {
    fontSize: 12,
    color: "#777",
  },
  vs: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
  },
  winnerText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
