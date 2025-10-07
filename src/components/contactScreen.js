import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import bgImage from "../../assets/bgimg.jpg";

export default function ContactScreen({ goBack }) {
  return (
    <ImageBackground
      source={bgImage} // yahan contact screen ka bg image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Contact Us 📞</Text>
        <Text style={styles.dataText}>Email: contact@myapp.com</Text>
        <Text style={styles.dataText}>Phone: +91 1234567890</Text>

        {/* Optional image */}
        <Image
          source={require("./assets/contactIcon.png")}
          style={styles.contactImage}
          resizeMode="contain"
        />

        <Pressable style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  dataText: { fontSize: 16, color: "#fff", textAlign: "center" },
  contactImage: { width: 200, height: 200, marginTop: 20, borderRadius: 12 },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
