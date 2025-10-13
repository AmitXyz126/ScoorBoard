import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
   Alert,
  Image,
} from "react-native";
import CustomInput from "../components/CustomInput";
import GradientButton from "../gradientButton/GradientButton";
import Colors from "../contants/Colors";
import bluevector from "../../assets/blueVector.png";
import backgroundLogo from "../../assets/Vectorbg.png";
import backgroundImg from "../../assets/Vectorbg.png";

const EnterScreen = ({ navigation }) => {
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
    <View style={styles.container}>
      {/* Background Images */}
      <Image source={backgroundLogo} style={styles.backgroundTop} />
      <Image source={backgroundImg} style={styles.backgroundBottom} />

      {/* Main Content */}
      <Image source={bluevector} style={styles.logo} />

      <Text style={styles.title}>SportSynz</Text>

      <Text style={styles.inputLabel}>Enter ID</Text>
      <CustomInput value={email} onChangeText={setEmail} />

      {/* Buttons in horizontal row */}
      <View style={styles.buttonRow}>
        <GradientButton
          title="Log In"
          onPress={() => {
            navigation.navigate("LoginPage");
            console.log("Login pressed");
          }}
          style={[styles.button, { flex: 1, marginRight: 10 }]}
        />
        <GradientButton
          title="Sign Up"
          onPress={() => {
            navigation.navigate("SignUp");
            console.log("Sign Up pressed");
          }}
          style={[styles.button, { flex: 1, marginLeft: 10 }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    zIndex: 1,
    opacity: 1,
  },
  backgroundBottom: {
    position: "absolute",
    top: 280,
    left: 0,
    width: "50%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "176deg" }],
    zIndex: 1,
    opacity: 1,
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    zIndex: 1,
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
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    flex: 0,
    height: 48,
    borderRadius: 10,
  },
});

export default EnterScreen;
