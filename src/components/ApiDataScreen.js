import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import bgImage from "../../assets/ball.webp";
 
export default function ApiDataScreen({ data, goBack }) {
  return (
    <ImageBackground
      source={bgImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image source={{ uri: data.url }} style={styles.apiImage} />
          <Text style={styles.dataText}>ID: {data.id}</Text>
          <Text style={styles.dataText}>Title: {data.title}</Text>

          <Pressable
            style={[styles.button, { marginTop: 25 }]}
            onPress={goBack}
          >
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        </View>
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
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  apiImage: { width: 250, height: 250, borderRadius: 12, marginBottom: 15 },
  dataText: { fontSize: 16, color: "#fff", textAlign: "center" },
  button: {
    backgroundColor: "#6B7280",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
