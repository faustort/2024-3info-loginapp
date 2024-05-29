import { useState } from "react";
import { Modal, Portal, Text, TextInput } from "react-native-paper";
import { styles } from "../config/styles";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function InsertNote() {
  const [text, setText] = useState("");

  // transformamos o visible em um objeto para poder usar o useState
  // e incluir a mensagem dentro da variável que controla a visibilidade
  const [visible, setVisible] = useState({
    visible: false,
    message: "Erro desconhecido",
  });

  // aqui faz parte do modal
  const showModal = (message) =>
    setVisible({
      visible: true,
      message: message,
    });
  const hideModal = () =>
    setVisible({
      ...visible,
      visible: false,
    });

  async function handleSubmit() {
    if (text.length <= 1) {
      showModal("A nota deve ter mais de 1 caractere");
      return;
    }
    try {
      const colRef = collection(db, "tarefas");
      const payload = {
        descricao: text,
        data: new Date(),
      };

      const docRef = await addDoc(colRef, payload);
      console.log("Document written with ID: ", docRef.id);
      if (text !== "") {
        setText("");
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      {/* Aqui começa o modal precisamos usar o Portal para encapsular */}
      <Portal>
        {/* aqui temos o modal que aparece quando ocorre um erro */}
        <Modal
          // aqui a visibilidade do modal é controlada pelo visible
          visible={visible.visible}
          // aqui o botão de fechar é controlado pelo hideModal
          onDismiss={hideModal}
          // aqui estamos usando um estilo customizado para o modal
          contentContainerStyle={styles.modal}
        >
          {/* Aqui dentro do modal temos um texto que é controlado pela variável message */}
          <Text style={styles.textoEscuro}>{visible.message}</Text>
        </Modal>
      </Portal>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Inserir nota"
        right={<TextInput.Icon onPress={handleSubmit} icon="send" />}
        style={styles.input}
      />
    </>
  );
}
