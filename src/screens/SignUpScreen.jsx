import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
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
    // console.log("Name:", name, "Email:", email, "Phone:", phone);
    Alert.alert("Success", "Account created successfully!");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>

        <Image source={backgroundLogo} style={styles.backgroundTop} />
      {/* <Logo size={100} /> */}
      <Image source={blueImg} style={styles.logo} />
      <Text style={styles.title}>SportSynz</Text>
      <Text style={styles.heading}>Sign Up</Text>

      <Text style={styles.inputLabel}>Full Name</Text>
      <CustomInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.inputLabel}>Email</Text>
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.inputLabel}>Phone Number</Text>
      <CustomInput
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        maxLength={10}
      />

      <Text style={styles.inputLabel}>Set Password</Text>
      <CustomInput
        placeholder="Set Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <CustomButton title="Sign Up" onPress={handleSignUp} />

      {/*  Divider with lines */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or Sign Up with</Text>
        <View style={styles.line} />
      </View>

      {/*  Google Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={GoogleIcon} style={styles.googleIcon} />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/*  Footer */}
     <View style={styles.footer}>
  <Text style={styles.footerText}>Already have an account?</Text>
  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Text style={styles.link}> Login</Text>
  </TouchableOpacity>
</View>
   <Image source={backgroundImg} style={styles.backgroundBottom} />
    </View>
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
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "center",
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
    marginBottom: 5,
    fontWeight: "600",
    color: Colors.text,
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
  },

  //  Divider styling
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

  //  Google button styling
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

export default SignUpScreen;
