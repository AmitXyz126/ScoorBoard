import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import CustomInput from "../components/CustomInput";
import GradientButton from "../gradientButton/GradientButton";
import Colors from "../contants/Colors";
import bluevector from "../../assets/blueVector.png";
import backgroundLogo from "../../assets/Vectorbg.png";
import backgroundImg from "../../assets/Vectorbg.png";
import { getMatchByCode } from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewLogin = ({ navigation }) => {
  const [matchCode, setMatchCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetMatch = async () => {
    if (!matchCode.trim()) {
      Alert.alert("Error", "Please enter match code!");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const matchData = await getMatchByCode(matchCode, token);
      // console.log("Match data:", matchData);

      if (!matchData) {
        Alert.alert("Not Found", "No match found for this code!");
        return;
      }

      navigation.navigate("FinalScoor", { match: matchData });
    } catch (error) {
      console.log("API error:", error);
      Alert.alert("Error", error?.message || "Failed to fetch match data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Image source={backgroundLogo} style={styles.backgroundTop} />
          <Image source={backgroundImg} style={styles.backgroundBottom} />
        </View>

        <Image source={bluevector} style={styles.logo} />
        <Text style={styles.title}>SportSynz</Text>

        <Text style={styles.inputLabel}>Enter Match Code</Text>
        <CustomInput
          value={matchCode}
          onChangeText={setMatchCode}
          placeholder="Enter match code"
        />

        <GradientButton
          onPress={handleGetMatch}
          title={loading ? "Loading..." : "View Match"}
          style={styles.secondLast}
          disabled={loading}
        />

        {/* {loading && (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginTop: 20 }}
          />
        )} */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  backgroundTop: {
    position: "absolute",
    top: -250,
    left: 210,
    width: "50%",
    height: "100%",
    resizeMode: "contain",
  },
  backgroundBottom: {
    position: "absolute",
    top: 280,
    left: 0,
    width: "50%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "176deg" }],
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.text,
    marginBottom: 25,
  },
  inputLabel: {
    color: "#414141",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 10,
  },
  secondLast: {
    marginTop: 32,
  },
});

export default ViewLogin;
