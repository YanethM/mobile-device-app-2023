import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Header";

export const ListCategoryService = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await client.get("/category-services");
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToNewCategoryService = () => {
    navigation.navigate("UploadImage");
  };

  const navigateToPostDetail = (postId) => {
    navigation.navigate("PostDetail", { id: postId });
  };
  const deletePost = async (postId) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    try {
      await client.delete(`/category-services/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la categoría", [
        {
          text: "OK",
        },
      ]);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header></Header>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToNewCategoryService}
        >
          <Text style={styles.buttonText}>Crear categoría</Text>
        </TouchableOpacity>
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postItem}>
              <View style={styles.postContent}>
                <TouchableOpacity onPress={() => navigateToPostDetail(post.id)}>
                  <Text style={styles.postTitle}>
                    {post.nameCategoryService}
                  </Text>
                  <Text>{post.descriptionCategoryService}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => navigateToPostDetail(post._id)}
                >
                  <Text style={styles.buttonText}>Ver Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePost(post._id)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  backButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#2a7de1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postsContainer: {
    marginTop: 20,
  },
  postItem: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: "#2a7de1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
});
