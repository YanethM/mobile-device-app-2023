import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";

export const Register = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Card = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
  };
  const handleRegister = async () => {
    try {
      axios
        .post("http://192.168.1.12:8000/api/v1/auth/register", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          current_password: password,
          role: "admin",
          active: true,
          avatar: "",
        })
        .then((response) => {
          console.log("Respuesta de registro:", response.data);
          Alert.alert(
            "Registro Exitoso",
            "¡Bienvenido! Por favor, inicia sesión para continuar."
          );
          // Redirige al usuario al componente de inicio de sesión después del registro exitoso
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.error("Error de registro:", error);
          Alert.alert(
            "Error",
            "Hubo un problema durante el registro. Por favor, inténtalo de nuevo más tarde."
          );
        });
    } catch (error) {
      console.error("Error de registro:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logov.jpg")}
            style={styles.logo}
          />
          <Text style={styles.companyName}>MANTENIMIENTO ANDINO</Text>
        </View>
        <TextInput
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
          placeholder={"Nombre"}
          style={styles.input}
        />
        <TextInput
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          placeholder={"Apellido"}
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder={"Correo Electrónico"}
          style={styles.input}
          keyboardType={"email-address"}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder={"Contraseña"}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button title={"Registrar"} onPress={handleRegister} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    marginBottom: 10,
    borderRadius: 5,
  },
});
