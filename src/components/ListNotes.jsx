import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { db } from "../config/firebase";
import { Text } from "react-native-paper";

export default function ListNotes() {
  const [tarefas, setTarefas] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tarefas"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTarefas(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
      console.log("Tarefas", tarefas);
    };

    fetchData();

    // Cleanup
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <View>
      <FlatList
        data={tarefas}
        renderItem={(item) => (
          <View key={item.id}>
            <Text>{item.data}</Text>
            <Text>{item.descricao}</Text>
          </View>
        )}
        // keyExtractor={() => {}}
      />
    </View>
  );
}
