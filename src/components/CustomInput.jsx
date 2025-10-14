import React from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
  keyboardType,
  showPasswordToggle,
}) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const isPasswordField = secureTextEntry && showPasswordToggle;

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordField ? !passwordVisible : secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={22}
              color="#0091FF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
  },
  iconButton: {
    paddingHorizontal: 12,
  },
});
