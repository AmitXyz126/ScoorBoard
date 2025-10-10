import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
 
export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
  keyboardType,
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",  
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    color: "#111827",  
    backgroundColor: "#fff",  
  },
});
