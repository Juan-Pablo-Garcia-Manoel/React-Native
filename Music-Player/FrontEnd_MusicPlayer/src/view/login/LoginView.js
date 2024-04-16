import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Icon, TextInput } from "react-native-paper";
import { login } from "../../service/ServiceUtil";

const LoginView = ({ navigation }) => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    senha: "",
    profile: "comum",
  });

  const [openEye, setOpenEye] = useState(true);

  function OpenEye() {
    setOpenEye(!openEye);
  }

  const [msg, setMsg] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      flex: 1,
      margin: 25,
      backgroundColor: "#7FDC8E", // Cor principal
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
    body: {
      flex: 3,
      margin: 20,
      width: "100%",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    edits: {
      width: "80%",
      marginVertical: 10,
    },
    button: {
      width: "80%",
      marginVertical: 20,
      backgroundColor: "#DB7F92", // Cor principal
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    errorMsg: {
      color: "red",
    },
    avatar: {
      backgroundColor: '#7FDC8E', // Cor de fundo do Avatar
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      opacity: 0.6,
    },
  });

  const callLogar = () => {
    // if (user.email == "arthur" && user.senha == "123") {
    //   sucesso();
    // }

    login(user.email, user.senha, user.profile, sucesso, erro);
  };

  const sucesso = (result) => {
    navigation.navigate("Tela DashBoard");
  };

  const erro = () => {
    setUser({ ...user, senha: "" });
    setMsg("Login ou senha incorreta!");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../img/imagem_fundo.jpg")} // Altere o caminho para a imagem desejada
        style={styles.backgroundImage}
      />
      <Avatar.Icon style={styles.avatar}
        size={80}
        icon="account-outline" />

      <View style={styles.body}>
        <TextInput
          style={styles.edits}
          label="E-mail"
          value={user.email}
          onChangeText={(e) => setUser({ ...user, email: e })}
          keyboardType="email-address"
          mode="outlined"
          theme={{ colors: { primary: "#DB7F92" } }} // Cor da borda
        />

        <TextInput
          style={styles.edits}
          label="Senha"
          right={<TextInput.Icon icon={openEye ? "eye" : "eye-off"} onPress={OpenEye} />}
          value={user.senha}
          onChangeText={(e) => setUser({ ...user, senha: e })}
          secureTextEntry={openEye}
          mode="outlined"
          theme={{ colors: { primary: "#DB7F92" } }} // Cor da borda
        />

        <Button
          icon="account-check"
          mode="contained"
          style={styles.button}
          onPress={callLogar}
        >
          <Text style={styles.buttonText}>LOGAR</Text>
        </Button>

        {msg !== "" && <Text style={styles.errorMsg}>{msg}</Text>}
      </View>
    </View>
  );
};

export default LoginView;
