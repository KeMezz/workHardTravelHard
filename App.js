import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (event) => setText(event);
  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDos = { ...toDos, [Date.now()]: { text, work: working } };
    setToDos(newToDos);
    setText("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "#fff" : theme.gray }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: !working ? "#fff" : theme.gray }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={working ? "오늘 할 일을 입력하세요" : "어디로 떠날까요?"}
          style={styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map((key) => (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          ))}
        </ScrollView>
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
    // flex: 1,
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 36,
    fontWeight: "600",
  },
  body: {
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    marginVertical: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    fontSize: 20,
  },
  toDo: {
    backgroundColor: "#222",
    marginVertical: 4,
    padding: 20,
    borderRadius: 12,
  },
  toDoText: { color: "#fff", fontSize: 18, fontWeight: "500" },
});
