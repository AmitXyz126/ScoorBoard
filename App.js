import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
import { useState } from "react";
import ContactScreen from "./src/components/contactScreen";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("home");

  const handleStart = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos/1"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setData(null);

  const backgroundImage =
    screen === "home"
      ? require("./assets/football.webp")
      : require("./assets/groundimg.webp");

  return (
    <>
      {screen === "contact" ? (
        <ContactScreen goBack={() => setScreen("home")} />
      ) : (
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            {!data && !loading && (
              <View style={styles.homeContainer}>
                <Text style={styles.title}>Welcome to MyApp ⚽</Text>
                <Pressable style={styles.button} onPress={handleStart}>
                  <Text style={styles.buttonText}>Start</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    { marginTop: 15, backgroundColor: "#6B7280" },
                  ]}
                  onPress={() => setScreen("contact")}
                >
                  <Text style={styles.buttonText}>Contact</Text>
                </Pressable>
              </View>
            )}

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Loading data...</Text>
              </View>
            )}

            {data && !loading && (
              <View style={styles.card}>
                <Image source={{ uri: data.url }} style={styles.apiImage} />
                <Text style={styles.dataText}>ID: {data.id}</Text>
                <Text style={styles.dataText}>Title: {data.title}</Text>
                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: "#6B7280", marginTop: 25 },
                  ]}
                  onPress={handleBack}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>
              </View>
            )}
          </View>
          <StatusBar style="light" />
        </ImageBackground>
      )}

      <ContactScreen/>
    </>
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
  homeContainer: { alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loadingContainer: { alignItems: "center" },
  loadingText: { marginTop: 10, color: "#fff", fontSize: 16 },
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
});
