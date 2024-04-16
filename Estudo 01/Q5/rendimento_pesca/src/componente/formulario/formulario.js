import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const FishingApp = () => {
  const [fishWeight, setFishWeight] = useState(0);
  const [totalMulta, setTotalMulta] = useState(0);

  const calculateMulta = () => {
    const fishWeightFloat = parseFloat(fishWeight);
    if (isNaN(fishWeightFloat)) {
      alert("Digite um valor numérico válido para o peso do peixe.");
      return;
    }

    if (fishWeightFloat > 50) {
      const excessWeight = fishWeightFloat - 50;
      const multa = excessWeight * 4;
      setTotalMulta(multa);
    } else {
      setTotalMulta(0);
    }
  };

  return (
    <View style={estilo.container}>
      <Text style={estilo.texto}>Informe o peso do peixe (em quilos):</Text>
      <TextInput
        style={estilo.input}
        keyboardType="numeric"
        value={fishWeight.toString()}
        onChangeText={(text) => setFishWeight(text)}
      />

      <Button title="Calcular Multa" color="black" onPress={calculateMulta} />

      <Text style={estilo.texto}>Total de Multa a Pagar: R$ {totalMulta.toFixed(2)}</Text>
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  texto: {
    fontSize: 25,
  },
});

export default FishingApp;
