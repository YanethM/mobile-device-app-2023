import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FirstScreen = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login"); // Asegúrate de que 'Login' sea el nombre correcto de tu pantalla de inicio de sesión
  };

  const navigateToRegister = () => {
    navigation.navigate("Register"); // Asegúrate de que 'Register' sea el nombre correcto de tu pantalla de registro
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logov.jpg")}
          style={styles.logo}
        />
        <Text style={styles.companyName}>MANTENIMIENTO ANDINO</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* Botón para ir a la pantalla de inicio de sesión */}
        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Botón para ir a la pantalla de registro */}
        <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default FirstScreen;
