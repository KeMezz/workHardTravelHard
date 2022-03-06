import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (event) => setText(event);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };
  useEffect(() => loadToDos(), []);

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = { [Date.now()]: { text, work: working }, ...toDos };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (key) => {
    Alert.alert("항목을 삭제하시겠습니까?", "", [
      { text: "취소", style: "destructive" },
      {
        text: "확인",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
    return;
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
          {toDos &&
            Object.keys(toDos).map(
              (key) =>
                toDos[key].work === working && (
                  <View style={styles.toDo} key={key}>
                    <Text style={styles.toDoText}>{toDos[key].text}</Text>
                    <TouchableOpacity onPress={() => deleteToDo(key)}>
                      <FontAwesome5
                        name="trash-alt"
                        size={18}
                        color="crimson"
                      />
                    </TouchableOpacity>
                  </View>
                )
            )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: { color: "#fff", fontSize: 18, fontWeight: "500" },
});
