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
} from "react-native";
import CustomInput from "../components/CustomInput";
import GradientButton from "../gradientButton/GradientButton";
import Colors from "../contants/Colors";
import bluevector from "../../assets/blueVector.png";
import backgroundLogo from "../../assets/Vectorbg.png";
import backgroundImg from "../../assets/Vectorbg.png";

const ViewLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    console.log("Email:", email, "Password:", password);
    Alert.alert("Success", "Login successful!");
    navigation.replace("Dashboard");
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
        <Text style={styles.inputLabel}>Email Address</Text>
        <CustomInput value={email} onChangeText={setEmail} />
        <Text style={styles.inputLabel}>Match ID</Text>
        <CustomInput value={email} onChangeText={setEmail} />
        <GradientButton
          onPress={() => navigation.navigate("FinalScoor")}
          title="Go to Home"
          style={styles.secondLast}
        />
        onPress={() => alert("Match Over!")}
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
    opacity: 1,
    zIndex: 0,
  },
  backgroundBottom: {
    position: "absolute",
    top: 280,
    left: 0,
    width: "50%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "176deg" }],
    opacity: 1,
    zIndex: 0,
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    zIndex: 2,
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
    // marginBottom: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    zIndex: 2,
  },
  button: {
    height: 48,
    borderRadius: 10,
  },
  secondLast: {
    marginTop: 32,
  },
});

export default ViewLogin;
