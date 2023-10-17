import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const optionsData = [
  {
    title: "Usuarios",
    image: require("../assets/images/project.png"),
    screen: "Usuarios",
  },
  {
    title: "Noticias",
    image: require("../assets/images/sedes.png"),
    screen: "ListCategoryService",
  },
  {
    title: "Publicaciones",
    image: require("../assets/images/posts.png"),
    screen: "Posts",
  },
  {
    title: "Clientes",
    image: require("../assets/images/clients.png"),
    screen: "Clientes",
  },
  {
    title: "Aliados",
    image: require("../assets/images/allies.png"),
    screen: "Aliados",
  },
  {
    title: "Proyectos",
    image: require("../assets/images/projects.png"),
    screen: "Proyectos",
  },
  {
    title: "Certificaciones",
    image: require("../assets/images/certification.png"),
    screen: "Certificaciones",
  },
];

const MainMenu = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
     
      {optionsData.map((option, index) => (
        <TouchableOpacity
          style={styles.card}
          key={index}
          onPress={() => navigateToScreen(option.screen)}
        >
          <Image source={option.image} style={styles.image} />
          <Text style={styles.title}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingTop: 70,
    paddingHorizontal: 10,
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
  card: {
    width: "30%", // Para mostrar tres tarjetas por fila, cada tarjeta debe ocupar aproximadamente el 30% del ancho total
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MainMenu;
