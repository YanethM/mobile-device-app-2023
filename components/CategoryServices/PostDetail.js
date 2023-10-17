import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import client from "../../api/client";

export const PostDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await client.get(`/category-services/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostById();
  }, [id]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  const goBack = () => {
    navigation.goBack();
  };
  const imageUrl = `http://192.168.1.12:8000/${post.avatar}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Volver Atrás</Text>
      </TouchableOpacity>
      <Image style={styles.avatar} source={{ uri: imageUrl }} />
      <Text style={styles.nameCategoryService}>{post.nameCategoryService}</Text>
      <Text style={styles.descriptionCategoryService}>
        {post.descriptionCategoryService}
      </Text>
    </View>
  );
};
export const PostDetailScreenOptions = ({ navigation, route }) => {
  return {
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  backButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    paddingBottom: 30,
  },
  nameCategoryService: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionCategoryService: {
    fontSize: 18,
  },
});

export default PostDetail;
