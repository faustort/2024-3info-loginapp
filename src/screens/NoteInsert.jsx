import { Surface } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../config/styles";
import InsertNote from "../components/InsertNote";

export default function NoteInsert() {
  return (
    <Surface style={styles.container}>
      <View>
        <InsertNote />
      </View>
      <View></View>
    </Surface>
  );
}
