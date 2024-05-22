import { Surface } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../config/styles";
import InsertNote from "../components/InsertNote";
import ListNotes from "../components/ListNotes";

export default function NoteInsert() {
  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ with: "100%" }}>
          <InsertNote style={{ with: "100%" }} />
        </View>
        <View>
          <ListNotes />
        </View>
      </View>
    </Surface>
  );
}
