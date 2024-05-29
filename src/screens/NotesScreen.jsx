import React, { useEffect, useState } from "react"; // Importa React e hooks necessários
import { View, FlatList } from "react-native"; // Importa componentes básicos do React Native
import {
  Button,
  Card,
  Paragraph,
  Portal,
  Dialog,
  TextInput,
  Provider,
  Surface,
} from "react-native-paper"; // Importa componentes do React Native Paper
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Importa funções do Firestore para manipulação de dados
import { db } from "../config/firebase";

const NotesScreen = () => {
  const [notes, setNotes] = useState([]); // Define o estado para armazenar as notas
  const [visible, setVisible] = useState(false); // Define o estado para controlar a visibilidade do modal
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: "",
    content: "",
  }); // Define o estado para a nota atual sendo editada ou adicionada

  // Função para buscar notas do Firestore
  const fetchNotes = async () => {
    const notesCollection = await getDocs(collection(db, "notes"));
    setNotes(
      notesCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    ); // Atualiza o estado das notas
  };

  useEffect(() => {
    fetchNotes(); // Chama a função fetchNotes quando o componente é montado
  }, []);

  // Função para mostrar o modal
  const showDialog = (note = { id: null, title: "", content: "" }) => {
    setCurrentNote(note); // Define a nota atual
    setVisible(true); // Mostra o modal
  };

  // Função para esconder o modal
  const hideDialog = () => setVisible(false);

  // Função para salvar ou atualizar uma nota
  const handleSave = async () => {
    if (currentNote.id) {
      // Atualiza a nota existente
      const noteRef = doc(db, "notes", currentNote.id);
      await updateDoc(noteRef, {
        title: currentNote.title,
        content: currentNote.content,
      });
    } else {
      // Adiciona uma nova nota
      await addDoc(collection(db, "notes"), {
        title: currentNote.title,
        content: currentNote.content,
      });
    }
    fetchNotes(); // Atualiza a lista de notas
    hideDialog(); // Esconde o modal
  };

  // Função para excluir uma nota
  const handleDelete = async (id) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
    fetchNotes(); // Atualiza a lista de notas
  };

  return (
    <Surface style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={notes} // Fonte de dados para a lista
          keyExtractor={(item) => item.id} // Chave única para cada item
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 10 }}>
              <Card.Title title={item.title} />
              <Card.Content>
                <Paragraph>{item.content}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => showDialog(item)}>Edit</Button>
                <Button onPress={() => handleDelete(item.id)}>Delete</Button>
              </Card.Actions>
            </Card>
          )}
        />
        <Button onPress={() => showDialog()}>Add Note</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>
              {currentNote.id ? "Edit Note" : "Add Note"}
            </Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Title"
                value={currentNote.title}
                onChangeText={(text) =>
                  setCurrentNote((prev) => ({ ...prev, title: text }))
                }
              />
              <TextInput
                label="Content"
                value={currentNote.content}
                onChangeText={(text) =>
                  setCurrentNote((prev) => ({ ...prev, content: text }))
                }
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleSave}>
                {currentNote.id ? "Update" : "Save"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Surface>
  );
};

export default NotesScreen;
