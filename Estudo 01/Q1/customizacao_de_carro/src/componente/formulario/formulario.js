import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação específica do Expo

const CarCustomizationApp = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [carModel, setCarModel] = useState('Modelo Padrão');
  const [ipiRate, setIpiRate] = useState(0.2); // 20% de IPI por padrão
  const [totalPrice, setTotalPrice] = useState(0);

  const accessories = [
    { name: 'Ar', price: 3000 },
    { name: 'Câmbio automático', price: 5000 },
    { name: 'Alarme', price: 800 },
    { name: 'Pintura especial', price: 2500 },
    { name: 'Teto solar', price: 4000 },
    { name: 'Kit multimidia', price: 1800 },
  ];

  const calculateCarCost = () => {
    let totalCost = 0;

    // Calcula o custo dos opcionais selecionados
    selectedOptions.forEach((option) => {
      const accessory = accessories.find((a) => a.name === option);
      if (accessory) {
        totalCost += accessory.price;
      }
    });

    // Aplica o IPI
    if (carModel === 'Modelo Importante') {
      totalCost += totalCost * (ipiRate + 0.3); // 30% de IPI adicional
    } else if (carModel === 'Modelo Econômico') {
      totalCost += totalCost * 0.1; // 10% de IPI para motores 1.0
    } else {
      totalCost += totalCost * ipiRate;
    }

    setTotalPrice(totalCost);
  };

  return (
    <View style={estilo.container}>
      <Text style={estilo.texto}>Selecione as opções do carro:</Text>
      {accessories.map((accessory) => (
        <View key={accessory.name} style={estilo.accessoryContainer}>
          <Button
            title={accessory.name}
            onPress={() => {
              if (selectedOptions.includes(accessory.name)) {
                setSelectedOptions(selectedOptions.filter((item) => item !== accessory.name));
              } else {
                setSelectedOptions([...selectedOptions, accessory.name]);
              }
            }}
            color={selectedOptions.includes(accessory.name) ? 'black' : 'grey'}
          />
        </View>
      ))}
      
      <Text style={estilo.texto}>Selecione o modelo do carro:</Text>
      
      <Picker
        selectedValue={carModel}
        onValueChange={(itemValue) => {
          setCarModel(itemValue);
          calculateCarCost();
        }}
        style={estilo.picker}
      >
  
        <Picker.Item label="Modelo Padrão" value="Modelo Padrão" />
        <Picker.Item label="Modelo Importante" value="Modelo Importante" />
        <Picker.Item label="Modelo Econômico" value="Modelo Econômico" />
      
      </Picker>
  
      {/* Envolve o botão e o texto em um View de alinhamento central */}
      <View style={estilo.centeredContent}>
        <Button title="Calcular" color="black" onPress={calculateCarCost} />
        <Text style={estilo.texto}>Preço Total do Carro: {totalPrice} R$</Text>
      </View>
    </View>
  );
  
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 25,
  },
  accessoryContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'grey'
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:'10%',
  },
  texto: {
    fontSize: 25,
  },
});

export default CarCustomizationApp;
