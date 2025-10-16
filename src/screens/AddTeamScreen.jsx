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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Colors from "../contants/Colors";
import GradientButton from "../gradientButton/GradientButton";
import { BlurView } from "expo-blur";
import CustomInput from "../components/CustomInput";
import backIcon from "../../assets/backIcon.png";
import { createTeam, uploadLogo } from "../api/auth";

const AddTeamScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState("");
  const [country, setCountry] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [teamLogo, setTeamLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTeam, setNewTeam] = useState(null);

  // Pick image from gallery
  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.canceled) return;

    setTeamLogo(pickerResult.assets[0]);
  };

  const handleSave = async () => {
    if (!teamName || !country) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      let logoUrl = null;

      if (teamLogo) {
        const uploadRes = await uploadLogo(teamLogo);
      
        logoUrl = uploadRes.url || uploadRes.id || 1;
      }
 
      const createdTeam = await createTeam({
        name: teamName,
        country,
        logo: logoUrl,
      });

      setNewTeam(createdTeam);
      setShowDialog(true);
    } catch (error) {
      alert(error.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTeam = () => {
    setShowDialog(false);
    navigation.navigate("SingleMatchScreen", { selectedTeam: newTeam });
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
          <Image source={backIcon} style={styles.backArrow} />
        </TouchableOpacity>

        <Text style={styles.title}>Add New Team</Text>

        <TouchableOpacity style={styles.imageUpload} onPress={handlePickImage}>
          {teamLogo ? (
            <Image
              source={{ uri: teamLogo.uri }}
              style={{ width: "100%", height: "100%", borderRadius: 50 }}
            />
          ) : (
            <Ionicons name="image-outline" size={48} color="#ccc" />
          )}
          <View style={styles.imageIcon}>
            <Ionicons name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

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
          title={loading ? <ActivityIndicator color="#fff" /> : "Save Team"}
          onPress={handleSave}
          style={styles.saveText}
          disabled={loading}
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
                source={{
                  uri: teamLogo?.uri || "https://i.ibb.co/yS6T3DH/team1.png",
                }}
                style={styles.modalImg}
              />
              {/* <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            /> */}
              {/* <Image
  source={{ uri: `${BASE_URL}${newTeam.logo.url}` }} 
  style={styles.modalImg}
/> */}
              <Text style={styles.modalTeam}>{newTeam?.name}</Text>
              <Text style={styles.modalCountry}>{newTeam?.country}</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSelectTeam}
              >
                <Text style={styles.modalButtonText}>
                  Select team for match
                </Text>
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
  backButton: { position: "absolute", top: 60, left: 20 },
  backArrow: { width: 24, height: 24 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 40 },
  imageUpload: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
    overflow: "hidden",
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
    marginTop: 30,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalBox: {
    width: "90%",
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
    paddingHorizontal: 50,
    paddingVertical: 5,
  },
});

export default AddTeamScreen;
