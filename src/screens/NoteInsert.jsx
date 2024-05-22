import { Surface } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../config/styles";
import InsertNote from "../components/InsertNote";
import ListNotes from "../components/ListNotes";

export default function NoteInsert() {
  return (
    <Surface style={styles.container}>
      <View>
        <InsertNote />
      </View>
      <View>
        <ListNotes />
      </View>
    </Surface>
  );
}
