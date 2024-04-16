import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Linking, ImageBackground } from "react-native";

const ExibeListaMusica = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const obterDadosDaAPI = async () => {
            try {
                const resposta = await fetch("http://localhost:5271/api/Musica");
                const dadosDaAPI = await resposta.json();
                setDados(dadosDaAPI);
            } catch (erro) {
                console.error('Erro ao obter dados da API:', erro);
            }
        };

        obterDadosDaAPI();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5271/api/Musica/${id}`, {
                method: 'DELETE',
            });

            // Atualiza a lista após a exclusão
            setDados((prevDados) => prevDados.filter((item) => item.id !== id));
        } catch (erro) {
            console.error('Erro ao excluir música:', erro);
        }
    };

    const handleOpenLink = (link) => {
        Linking.openURL(link);
    };

    
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => handleOpenLink(item.link)}>
                <View>
                    <Text style={styles.nome}>{item.nome}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelete(item.id)}
                    >
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../img/imagem_fundo2.jpg")}
                style={styles.backgroundImage}
                />
            <Text style={styles.titulo}>Lista de Músicas</Text>
            <FlatList
                data={dados}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                />
        </View>
    );
    
    // Banco Fake
    // const musicas = [
    //     {
    //         "id": "36012436-2d7a-4209-85d4-eacf6deb2094",
    //         "idUsuario": null,
    //         "nome": "Let Her Go - Passenger",
    //         "link": "https://www.youtube.com/watch?v=RBumgq5yVrA&ab_channel=Passenger"
    //     },
    //     {
    //         "id": "7b38aadd-3eb0-45ff-8687-59f639a8e0b0",
    //         "idUsuario": null,
    //         "nome": "Slipknot - Psychosocial",
    //         "link": "https://www.youtube.com/watch?v=5abamRO41fE&ab_channel=Slipknot"
    //     },
    //     {
    //         "id": "aaf58249-3899-487e-a512-3775163b716d",
    //         "idUsuario": null,
    //         "nome": "Slow Dancing In A Burning Room - John Mayer",
    //         "link": "https://www.youtube.com/watch?v=32GZ3suxRn4&ab_channel=codyates2181"
    //     },
    //     {
    //         "id": "7d8f2ef8-2b74-49e9-8bae-b3df241d2101",
    //         "idUsuario": null,
    //         "nome": "Tempo Perdido - Legião Urbana",
    //         "link": "https://www.youtube.com/watch?v=2hr7Uqu6G80&ab_channel=LeonardoRodrigues"
    //     }
    // ];

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 22,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    nome: {
        fontWeight: 'bold',
    },
    link: {
        color: 'blue',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#DB7F92',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
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

export default ExibeListaMusica;
