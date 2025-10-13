import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomInput from "../components/CustomInput";
import GradientButton from "../gradientButton/GradientButton";
import Colors from "../contants/Colors";
import blueImg from "../../assets/blueVector.png";
import GoogleIcon from "../../assets/googleIcon.png";
import backgroundLogo from "../../assets/Vectorbg.png";
import backgroundImg from "../../assets/Vectorbg.png";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password || !phone) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    Alert.alert("Success", "Account created successfully!");
    navigation.replace("Login");
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
        {/* Backgrounds */}
        <Image source={backgroundLogo} style={styles.backgroundTop} />
        <Image source={blueImg} style={styles.logo} />

        <Text style={styles.title}>SportSynz</Text>
        <Text style={styles.heading}>Sign Up</Text>

        {/* Full Name */}
        <Text style={styles.inputLabel}>Full Name</Text>
        <CustomInput value={name} onChangeText={setName} />

        {/* Email */}
        <Text style={styles.inputLabel}>Email</Text>
        <CustomInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Phone Number (Simple Input) */}
        <Text style={styles.inputLabel}>Phone Number</Text>
        <CustomInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Password */}
        <Text style={styles.inputLabel}>Set Password</Text>
        <CustomInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          showPasswordToggle={true}
        />

        {/* Sign Up Button */}
        <GradientButton
          title="Sign Up"
          onPress={handleSignUp}
          style={styles.signUpButton}
        />

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Sign Up with</Text>
          <View style={styles.line} />
        </View>

        {/* Google Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Image source={GoogleIcon} style={styles.googleIcon} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}> Login</Text>
          </TouchableOpacity>
        </View>

        <Image source={backgroundImg} style={styles.backgroundBottom} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    top: 320,
    left: 0,
    width: "50%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ rotate: "176deg" }],
    zIndex: 1,
    opacity: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.text,
    marginBottom: 25,
  },
  heading: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.text,
    marginBottom: 25,
  },
  inputLabel: {
    marginBottom: 1,
    fontWeight: "600",
    color: Colors.text,
  },
  signUpButton: {
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "stretch",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: {
    marginHorizontal: 10,
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
  },
  googleButton: {
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    height: 48,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  googleIcon: { width: 20, height: 20, marginRight: 8 },
  googleText: { fontSize: 15, fontWeight: "500", color: "#414141" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
  footerText: { color: Colors.gray },
  link: { color: Colors.primary, fontWeight: "600" },
});

export default SignUpScreen;
