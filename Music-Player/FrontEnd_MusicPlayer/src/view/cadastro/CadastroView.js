import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { registrarUsuario } from "../../service/ServiceUtil";

const CadastroView = ({ navigation }) => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    senha: "",
    profile: "comum",
  });

  const [openEye, setOpenEye] = useState(true);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    body: {
      padding: 20,
      flex: 1,
    },
    tituloView: {
      alignItems: "center",
      marginBottom: 20,
    },
    titulo: {
      fontSize: 24,
      color: "#7FDC8E", // Cor principal
      fontWeight: "bold",
    },
    containerCV: {
      marginVertical: 10,
    },
    conteinerCVBtn: {
      backgroundColor: "#7FDC8E", // Cor principal
      marginVertical: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
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

  const cadUser = () => {
    setLoading(true);
    registrarUsuario(user.email, user.senha, user.profile, sucesso, erro);
  };

  const sucesso = (result) => {
    navegar();
  };

  const erro = (e) => {
    console.log(e);
    setLoading(false);
  };

  const navegar = () => {
    navigation.navigate("Tela Inicial");
  };

  return (
    <>
      {loading && (
        <View>
          <ImageBackground
            source={require("../../img/imagem_fundo.jpg")}
            style={styles.backgroundImage}
          />
          <ActivityIndicator
            animating={true}
            size={80}
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center",
              paddingTop: 120,
            }}
          />
        </View>
      )}

      {!loading && (
        <ScrollView>
          <ImageBackground
            source={require("../../img/imagem_fundo.jpg")}
            style={styles.backgroundImage}
          />
          <View style={styles.body}>
            <View style={styles.tituloView}>
              <Text style={styles.titulo}>Cadastro</Text>
            </View>

            <View>
              <TextInput
                style={styles.containerCV}
                label="E-mail"
                value={user.email}
                onChangeText={(e) => setUser({ ...user, email: e })}
                keyboardType="email-address"
                mode="outlined"
                theme={{ colors: { primary: "#DB7F92" } }} // Cor da borda
              />

              <TextInput
                style={styles.containerCV}
                label="Senha"
                right={<TextInput.Icon icon={openEye ? "eye" : "eye-off"} onPress={() => setOpenEye(!openEye)} />}
                value={user.senha}
                onChangeText={(e) => setUser({ ...user, senha: e })}
                secureTextEntry={openEye}
                mode="outlined"
                theme={{ colors: { primary: "#DB7F92" } }} // Cor da borda
              />
            </View>

            <View>
              <Button
                style={styles.conteinerCVBtn}
                mode="contained"
                onPress={cadUser}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default CadastroView;
