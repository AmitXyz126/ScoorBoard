import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../contants/Colors";
import { Ionicons } from "@expo/vector-icons";

const SelectMatchScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleNext = () => {
    if (!selectedType) {
      alert("Please select a match type!");
      return;
    }

    navigation.replace("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        {/*  Back arrow */}
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/*  Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressActive} />
        <View style={styles.progressActive} />
      </View>

      <Text style={styles.heading}>Select</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedType === "single" && styles.selectedCard,
          ]}
          onPress={() => setSelectedType("single")}
        >
          <Text style={styles.optionText}>Single Match</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            selectedType === "tournament" && styles.selectedCard,
          ]}
          onPress={() => setSelectedType("tournament")}
        >
          <Text style={styles.optionText}>Tournament</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.pageText}>2/2</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 50,
  },
  progressActive: {
    height: 5,
    width: 145,
    backgroundColor: "#3F8CFF",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 40,
  },
  optionsContainer: {
    alignItems: "center",
  },
  optionCard: {
    width: "85%",
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  selectedCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000",
    paddingHorizontal:20,
  },
  footer: {
    marginTop: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageText: {
    fontSize: 24,
    color: "#068EFF",
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: Colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SelectMatchScreen;
