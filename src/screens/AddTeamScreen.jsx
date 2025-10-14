import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../contants/Colors";
import GradientButton from "../gradientButton/GradientButton";
import { BlurView } from "expo-blur";
import CustomInput from "../components/CustomInput";

const AddTeamScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState("");
  const [country, setCountry] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleSave = () => {
    if (!teamName || !country) {
      alert("Please fill all fields!");
      return;
    }
    setShowDialog(true);
  };

  const handleSelectTeam = () => {
    setShowDialog(false);
    navigation.goBack();
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Add New Team</Text>

        <View style={styles.imageUpload}>
          <Ionicons name="image-outline" size={48} color="#ccc" />
          <TouchableOpacity style={styles.imageIcon}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Team Name"
          value={teamName}
          onChangeText={setTeamName}
        />
        <CustomInput
          label="Country"
          value={country}
          onChangeText={setCountry}
        />

        <GradientButton
          title="Save Team"
          onPress={handleSave}
          style={styles.saveText}
        />

        {/* Modal (Dialog Box) */}
        <Modal
          visible={showDialog}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDialog(false)}
        >
          <View style={styles.modalContainer}>
            <BlurView
              intensity={20}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.modalBox}>
              <Image
                source={{ uri: "https://i.ibb.co/yS6T3DH/team1.png" }}
                style={styles.modalImg}
              />
              <Text style={styles.modalTeam}>{teamName}</Text>
              <Text style={styles.modalCountry}>{country}</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSelectTeam}
              >
                <Text style={styles.modalButtonText}>Select team for match</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 80,
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 40,
  },
  imageUpload: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  imageIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 4,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    height: 48,
    borderRadius: 10,
    marginTop: 296,
    alignSelf: "stretch",
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    padding: 25,
  },
  modalImg: { width: 80, height: 80, borderRadius: 40, marginBottom: 15 },
  modalTeam: { fontSize: 18, fontWeight: "700" },
  modalCountry: { fontSize: 15, color: "#777", marginBottom: 15 },
  modalButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modalButtonText: {
    color: "#0C559E",
    fontWeight: "600",
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
});

export default AddTeamScreen;
