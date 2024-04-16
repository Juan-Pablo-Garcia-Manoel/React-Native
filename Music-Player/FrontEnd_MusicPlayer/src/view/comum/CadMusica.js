import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground } from "react-native";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";

const CadMusica = ({ navigation }) => {
    const [obj, setObj] = useState({
        nome: "",
        link: "",
    });

    const cadM = () => {
        const apiUrl = "http://localhost:5271/api/Musica";
        // const apiUrl = "http://http://3.226.36.203:5000/api/Musica";

        const formData = new FormData();
        formData.append("Id", "");
        formData.append("IdUsuario", "");
        formData.append("Nome", obj.nome);
        formData.append("Link", obj.link);

        axios
            .post(apiUrl, formData, {
                headers: {
                    accept: "text/plain",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("Resposta:", response.data);
            })
            .catch((error) => {
                console.error("Erro:", error);
            });
    };

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
            backgroundColor: "#7FDC8E",
            marginVertical: 20,
            paddingVertical: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
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

    return (
        <ImageBackground
            source={require("../../img/imagem_fundo2.jpg")}
            style={styles.backgroundImage}
        >
        <View style={styles.body}>
            <View style={styles.tituloView}>
                <Text style={styles.titulo}>Cadastro</Text>
            </View>

            <View>
                <TextInput
                    style={styles.containerCV}
                    label="Nome"
                    value={obj.nome}
                    onChangeText={(e) => setObj({ ...obj, nome: e })}
                    mode="outlined"
                    theme={{ colors: { primary: "#DB7F92" } }}
                />

                <TextInput
                    style={styles.containerCV}
                    label="Link"
                    value={obj.link}
                    onChangeText={(e) => setObj({ ...obj, link: e })}
                    mode="outlined"
                    theme={{ colors: { primary: "#DB7F92" } }}
                />
            </View>

            <View>
                <Button
                    style={styles.conteinerCVBtn}
                    mode="contained"
                    onPress={cadM}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </Button>
            </View>
        </View>
        </ImageBackground>
    );
};

export default CadMusica;
