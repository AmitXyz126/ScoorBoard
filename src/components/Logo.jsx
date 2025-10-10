import React from "react";
import { Image, StyleSheet, View } from "react-native";
import logo from "../../assets/icon.jpg"

export default function Logo({ size = 120 }) {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={[styles.logo, { width: size, height: size }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
  },
});
