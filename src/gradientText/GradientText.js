import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const GradientText = ({ text, style }) => {
  // your gradient colors
  const colors = ["#068EFF", "#0C559E"];

  //  iOS (MaskedView)
  if (Platform.OS === "ios") {
    return (
      <MaskedView
        maskElement={
          <Text style={[style, styles.maskedText]}>{text}</Text>
        }
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={colors}
        >
          <Text style={[style, styles.transparentText]}>{text}</Text>
        </LinearGradient>
      </MaskedView>
    );
  }

  // ✅ Android + Web fallback
  return (
    <Text
      style={[
        style,
        styles.maskedText,
        Platform.select({
          web: {
            backgroundImage: "linear-gradient(90deg, #068EFF, #0C559E)",
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
          default: {
            color: "#068EFF", // fallback single color for Android
          },
        }),
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  maskedText: {
    backgroundColor: "transparent",
    textAlign: "center",
  },
  transparentText: {
    color: "transparent",
    textAlign: "center",
  },
});

export default GradientText;
