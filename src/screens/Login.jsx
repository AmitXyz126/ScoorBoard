import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Checkbox } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import GradientButton from "../gradientButton/GradientButton";
import Colors from "../contants/Colors";
import blueImg from "../../assets/blueVector.png";
import GoogleIcon from "../../assets/googleIcon.png";
import backgroundLogo from "../../assets/Vectorbg.png";
import backgroundsecond from "../../assets/VectorSecond.png";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    Alert.alert("Success", "Login successful!");
    navigation.replace("SelectSport"); 
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Background Images */}
        <Image
          source={backgroundLogo}
          style={styles.backgroundImage}
          pointerEvents="none"
        />
        <Image
          source={backgroundsecond}
          style={styles.backgroundImg}
          pointerEvents="none"
        />

        <View style={styles.content}>
          {/* Logo and Headings */}
          <Image source={blueImg} style={styles.logo} />
          <Text style={styles.title}>SportSynz</Text>
          <Text style={styles.heading}>Get Started Now</Text>
          <Text style={styles.description}>
            Log in to explore about our app
          </Text>

          {/* Email Input */}
          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password Input */}
          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            showPasswordToggle={true}
          />

          {/* Remember me + Forgot password */}
          <View style={styles.rememberContainer}>
            <View style={styles.checkboxRow}>
              <Checkbox.Android
                status={rememberMe ? "checked" : "unchecked"}
                onPress={() => setRememberMe(!rememberMe)}
                uncheckedColor="#414141"
                theme={{ colors: { primary: "#068EFF" } }}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert("Forgot Password?")}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <GradientButton
            title="Log In"
            onPress={handleLogin}
            style={styles.signUpButton}
          />

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or login with</Text>
            <View style={styles.line} />
          </View>

          {/* Google Button */}
          <TouchableOpacity style={styles.googleButton}>
            <Image source={GoogleIcon} style={styles.googleIcon} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.link}> Sign Up</Text>
              
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: -240,
    left: 214,
    width: "49%",
    height: "100%",
    resizeMode: "contain",
    zIndex: 2,
    opacity: 1.25,
  },
  backgroundImg: {
    position: "absolute",
    top: 320,
    left: 2,
    width: "49%",
    height: "100%",
    resizeMode: "contain",
    zIndex: 1,
    opacity: 1.25,
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
    marginBottom: 24,
  },
  heading: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.text,
    marginBottom: 25,
  },
  signUpButton: {
    height: 48,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "stretch",
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#414141",
  },
  rememberText: {
    color: "#414141",
    fontSize: 12,
  },
  forgotText: {
    color: "#068EFF",
    fontSize: 12,
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
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
    borderColor: "#EFF0F7",
    borderRadius: 10,
    height: 48,
    backgroundColor: "#EFF0F7",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#414141",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  footerText: {
    color: Colors.gray,
  },
  link: {
    color: "#068EFF",
    fontWeight: "600",
  },
});

export default Login;
