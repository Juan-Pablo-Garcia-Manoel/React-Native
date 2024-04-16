import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { IconButton } from "react-native-paper";

const HomeView = ({ navigation }) => {
  const styles = StyleSheet.create({
    containerHV: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    containerHVBtn: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: 20,
    },
    button: {
      backgroundColor: "#77867A",
    },
    icon: {
      color: "blue",
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      opacity: 0.6,
      zIndex: 1
    },
  });

  return (
    <ImageBackground
      source={require("../../img/imagem_fundo.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.containerHV}>
        <View style={styles.containerHVBtn}>
          <IconButton
            icon="account-lock-outline"
            style={styles.button}
            iconStyle={styles.icon}
            size={84}
            onPress={() => navigation.navigate("Tela Login")}
          />
          <IconButton
            icon="account-group-outline"
            style={styles.button}
            iconStyle={styles.icon}
            size={84}
            onPress={() => navigation.navigate("Tela Cadastro")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeView;
