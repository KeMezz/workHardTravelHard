import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableHighlight onPress={() => console.log("pressed")}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableHighlight>
        <Text style={styles.btnText}>Travel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    // justifyContent: "space-between",
  },
  btnText: {
    color: theme.gray,
    flex: 1,
    fontSize: 36,
    fontWeight: "600",
  },
});
