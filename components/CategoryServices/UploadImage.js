import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Alert,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormData from "form-data";
import Header from "../Header";


export const UploadImage = ({ navigation }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [nameCategoryService, setNameCategoryService] = useState("");
  const [descriptionCategoryService, setDescriptionCategoryService] =
    useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso insuficiente",
          "Necesitas conceder acceso a la cámara para usar esta aplicación."
        );
      }

      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permiso insuficiente",
          "Necesitas conceder acceso a la galería para usar esta aplicación."
        );
      }
    })();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const takeImageHandler = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      setPickedImage(result.assets[0].uri);
    } else {
      console.warn(
        "La selección de imagen fue cancelada o el resultado es incorrecto."
      );
    }
  };

  const pickImageHandler = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!image.canceled && image.assets && image.assets.length > 0) {
      setPickedImage(image.assets[0].uri);
    } else {
      console.warn(
        "La selección de imagen fue cancelada o el resultado es incorrecto."
      );
    }
  };

  let imagePreview = (
    <Text style={styles.previewText}>No se ha seleccionado ninguna imagen</Text>
  );

  if (pickedImage) {
    imagePreview = (
      <Image source={{ uri: pickedImage }} style={styles.imageStyle} />
    );
  }

  const saveDataPost = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    // Crea un objeto FormData para enviar los datos como formulario multipart
    const formData = new FormData();
    formData.append("nameCategoryService", nameCategoryService);
    formData.append("descriptionCategoryService", descriptionCategoryService);
    formData.append("active", active);

    const localUri = pickedImage;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    formData.append("avatar", {
      uri: localUri,
      name: filename,
      type,
    });

    try {
      const response = await client.post(
        "/category-services/new-category",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      navigation.navigate("ListCategoryService");
      console.log("Navegando a ListCategoryService");
      alert("Categoría creada correctamente", [
        {
          text: "OK",
          onPress: () => navigation.navigate("ListCategoryService"),
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Error al crear la categoría", [
        {
          text: "OK",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Header></Header>
      <Text style={styles.labelTitle}>CREAR PUBLICACIÓN</Text>
      <TextInput
        value={nameCategoryService}
        onChangeText={(text) => setNameCategoryService(text)}
        placeholder={"Nombre"}
        style={styles.input}
      />
      <TextInput
        value={descriptionCategoryService}
        onChangeText={(text) => setDescriptionCategoryService(text)}
        placeholder={"Descripción"}
        style={styles.input}
      />
      <Button
        title="Tomar Foto"
        onPress={takeImageHandler}
        style={styles.button}
      />
      <Button
        title="Elegir desde la galería"
        onPress={pickImageHandler}
        style={styles.button}
      />
      <View style={styles.imagePreviewContainer}>{imagePreview}</View>

      <TouchableOpacity
        onPress={saveDataPost}
        style={[
          styles.button,
          styles.uploadButton,
          { opacity: loading ? 0.5 : 1 },
        ]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Subiendo..." : "Upload"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100, // Ajusta el tamaño según el diseño de tu logo
    height: 100, // Ajusta el tamaño según el diseño de tu logo
    resizeMode: "contain", // Ajusta el modo de redimensionamiento según tus necesidades
  },
  backButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  imagePreviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
    marginVertical: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  previewText: {
    color: "#592454",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  labelTitle: {
    alignSelf: "center",
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#592454",
  },
  label: {
    alignSelf: "flex-start",
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    height: 40,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
  },
  uploadButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
