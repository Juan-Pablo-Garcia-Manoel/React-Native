import React from "react";
import {StyleSheet, TouchableOpacity, Text } from "react-native"

const Button = ()=>{
    return(
        <TouchableOpacity style={estilo.button} onPress={onPress}>

            <Text style={estilo.buttonText}> Salvar </Text>

        </TouchableOpacity>
    )
}

const onPress = ()=>{
    console.log('Opções foram salvas');
}

const estilo = StyleSheet.create({
    button: {
      backgroundColor: 'gray',
      padding: 2,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText:{
      color: 'white',
      fontFamily: 'arial',
      fontSize:10,
    },
  });

export default Button; 