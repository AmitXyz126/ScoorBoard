import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Checkbox } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
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
    navigation.replace("Dashboard");
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Image source={backgroundLogo} style={styles.backgroundImage} />
        <Image source={blueImg} style={styles.logo} />
        <Text style={styles.title}>SportSynz</Text>
        <Text style={styles.heading}>Get Started Now</Text>
        <Text style={styles.description}>Log in to explore about our app</Text>

        <Text style={styles.inputLabel}>Email</Text>
        <CustomInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <CustomInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.rememberContainer}>
          <View style={styles.checkboxRow}>
            <Checkbox
              status={rememberMe ? "checked" : "unchecked"}
              onPress={() => setRememberMe(!rememberMe)}
              color="#414141"
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert("Forgot Password?")}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton title="Log In" onPress={handleLogin} />

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image source={GoogleIcon} style={styles.googleIcon} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.link}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={backgroundsecond} style={styles.backgroundImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: -269,
    left: 198,
    width: "49%",
    height: "100%",
    resizeMode: "contain",
    zIndex: 2,
    opacity: 1.25,
  },
  backgroundImg: {
    position: "absolute",
    top: 350,
    left: 2,
    width: "49%",
    height: "100%",
    resizeMode: "contain",
    zIndex: 2,
    opacity: 1.25,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.background,
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
  inputLabel: {
    marginBottom: 1,
    fontWeight: "600",
    color: Colors.text,
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    color: "#b3b3b3",
    fontSize: 14,
  },
  forgotText: {
    color: "#6E36BE",
    fontSize: 14,
    fontWeight: "500",
  },

  // Divider Styling
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
    color: Colors.primary,
    fontWeight: "600",
  },
});

export default Login;
