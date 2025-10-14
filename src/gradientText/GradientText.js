import React from "react";
import { Text, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const GradientText = ({ text, style }) => {
  return (
    <MaskedView maskElement={<Text style={[style, styles.maskedText]}>{text}</Text>}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#068EFF", "#0C559E"]}
      >
        <Text style={[style, styles.transparentText]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  maskedText: {
    // This defines the shape of the mask
    backgroundColor: "transparent",
    textAlign: "center",
  },
  transparentText: {
    color: "transparent",
    textAlign: "center",
  },
});

export default GradientText;
