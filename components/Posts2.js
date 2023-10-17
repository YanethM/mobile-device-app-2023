import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  Modal,
  Text,
  View,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export const Posts2 = () => {
  const [postsList, setPostsLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editPostData, setEditPostData] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
    avatar: "",
    active: false,
    fecha_creacion: new Date(),
  });

  const openEditModal = (postId) => {
    const postToEdit = postsList.find((post) => post._id === postId);
    setEditPostId(postId);
    setEditPostData(postToEdit);
    setModalVisible(true);
  };

  const handleCancel = () => {
    closeEditModal();
  };

  const pickImage = async () => {
    try {
      const resultPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (resultPermission.granted === false) {
        Alert.alert("Permisos requeridos", "Se requiere acceder a la galería");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        const { uri } = result; // Accede a la propiedad 'uri' de 'result' utilizando desestructuración
        const imageBase64 = await ImageManipulator.toBase64(uri);
        setAvatarBase64(imageBase64);
        setEditPostData({ ...editPostData, avatar: imageBase64 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeEditModal = () => {
    setEditPostId(null);
    setEditPostData({
      titulo: "",
      subtitulo: "",
      descripcion: "",
      avatar: "",
      active: false,
      fecha_creacion: new Date(),
    });
    setModalVisible(false);
  };

  const handleDeletePost = (postId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este post?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            console.log("Eliminación cancelada");
          },
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            console.log("Eliminando post...");
            axios
              .delete(
                `http://192.168.1.12:8000/api/v1/admin/posts/${postId}`
              )
              .then((response) => {
                console.log("Data delete post:", response.data);
                listPosts();
              })
              .catch((error) => {
                console.error(error);
              });
          },
          style: "destructive",
        },
      ]
    );
  };

  const listPosts = () => {
    fetch("http://mantenimientoandino.co:3000/api/v1/admin/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data posts:", data);
        setPostsLists(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSave = async () => {
    try {
      if (
        !editPostData.titulo ||
        !editPostData.subtitulo ||
        !editPostData.descripcion
      ) {
        Alert.alert(
          "Campos obligatorios",
          "Por favor, complete todos los campos."
        );
        return;
      }
      setEditPostData({ ...editPostData });
      const headers = {
        "Content-Type": "application/json",
      };
      console.log("Body:", body);
      const response = await axios.post(
        "http://mantenimientoandino.co:3000/api/v1/admin/posts/new-post",
        body,
        { headers }
      );
      console.log("Data save post:", response.data);
      listPosts();
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <FlatList
        data={postsList}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.avatar }} style={{ width: 50 }} />
            <Text>{item.titulo}</Text>
            <Text>{item.subtitulo}</Text>
            <Text>{item.descripcion}</Text>
            <Text>{item.active ? "Y" : "N"}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => openEditModal(item._id)}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeletePost(item._id)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Button
        title="Create post"
        onPress={() => {
          setEditPostId(null);
          setEditPostData({
            titulo: "",
            subtitulo: "",
            descripcion: "",
            avatar: "",
            active: false,
            fecha_creacion: new Date(),
          });
          setModalVisible(true);
        }}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={closeEditModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Titulo post"
            style={styles.input}
            onChangeText={(titulo_text) => {
              setEditPostData({ ...editPostData, titulo: titulo_text });
            }}
            value={editPostData.titulo}
          />

          <TextInput
            placeholder="Subtitulo post"
            style={styles.input}
            onChangeText={(subtitulo_text) => {
              setEditPostData({ ...editPostData, subtitulo: subtitulo_text });
            }}
            value={editPostData.subtitulo}
          />
          <TextInput
            placeholder="Descripción post"
            style={styles.input}
            onChangeText={(descripcion_text) => {
              setEditPostData({
                ...editPostData,
                descripcion: descripcion_text,
              });
            }}
            value={editPostData.descripcion}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text>Seleccionar Imagen</Text>
          </TouchableOpacity>
          {avatarPreview && (
            <Image
              source={{ uri: avatarPreview }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button title="Save" onPress={handleSave} color="green" />
          <Button title="Cancelar" onPress={handleCancel} color="red" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    height: "auto",
    width: "100%",
    marginTop: 30,
  },
  postContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 8,
    borderRadius: 8,
    width: 100,
    alignItems: "center",
  },
});
