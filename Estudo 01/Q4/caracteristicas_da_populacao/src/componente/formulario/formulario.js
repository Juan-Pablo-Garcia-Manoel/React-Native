import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const PopulationSurveyApp = () => {
  const [people, setPeople] = useState([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [minHeight, setMinHeight] = useState(1000);
  const [averageHeightWomen, setAverageHeightWomen] = useState(0);
  const [numMen, setNumMen] = useState(0);
  const [percentageMen, setPercentageMen] = useState(0);
  const [percentageWomen, setPercentageWomen] = useState(0);
  const [percentageGreenEyedBlondeWomen, setPercentageGreenEyedBlondeWomen] = useState(0);

  const [newPerson, setNewPerson] = useState({
    sex: '',
    age: '',
    height: '',
    eyeColor: '',
    hairColor: '',
  });

  const addPerson = () => {
    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    calculateStatistics(updatedPeople);
    setNewPerson({
      sex: '',
      age: '',
      height: '',
      eyeColor: '',
      hairColor: '',
    });
  };

  const calculateStatistics = (people) => {
    let totalHeightWomen = 0;
    let totalWomen = 0;
    let totalMen = 0;
    let greenEyedBlondeWomen = 0;

    let maxHeightValue = 0;
    let minHeightValue = 1000;

    people.forEach((person) => {
      const { sex, eyeColor, hairColor, age, height } = person;

      if (height > maxHeightValue) {
        maxHeightValue = height;
      }
      if (height < minHeightValue) {
        minHeightValue = height;
      }

      if (sex === 'Feminino') {
        totalHeightWomen += height;
        totalWomen++;

        if (age >= 18 && age <= 35 && eyeColor === 'Verde' && hairColor === 'Loiro') {
          greenEyedBlondeWomen++;
        }
      } else if (sex === 'Masculino') {
        totalMen++;
      }
    });

    const totalPeople = people.length;

    setMaxHeight(maxHeightValue);
    setMinHeight(minHeightValue);
    setNumMen(totalMen);
    setPercentageMen(totalPeople > 0 ? (totalMen / totalPeople) * 100 : 0);
    setPercentageWomen(totalPeople > 0 ? (totalWomen / totalPeople) * 100 : 0);
    setPercentageGreenEyedBlondeWomen(totalWomen > 0 ? (greenEyedBlondeWomen / totalWomen) * 100 : 0);
    setAverageHeightWomen(totalWomen > 0 ? totalHeightWomen / totalWomen : 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Informe os dados dos habitantes:</Text>
      <TextInput
        placeholder="Sexo (Masculino/Feminino)"
        value={newPerson.sex}
        onChangeText={(text) => setNewPerson({ ...newPerson, sex: text })}
      />
      <TextInput
        placeholder="Idade"
        value={newPerson.age}
        onChangeText={(text) => setNewPerson({ ...newPerson, age: text })}
      />
      <TextInput
        placeholder="Altura (cm)"
        value={newPerson.height}
        onChangeText={(text) => setNewPerson({ ...newPerson, height: text })}
      />
      <TextInput
        placeholder="Cor dos Olhos"
        value={newPerson.eyeColor}
        onChangeText={(text) => setNewPerson({ ...newPerson, eyeColor: text })}
      />
      <TextInput
        placeholder="Cor do Cabelo"
        value={newPerson.hairColor}
        onChangeText={(text) => setNewPerson({ ...newPerson, hairColor: text })}
      />
      <Button title="Adicionar Pessoa" onPress={addPerson} />
      {/* Adicione mais botões e campos de entrada para outros dados aqui */}
      <Text style={styles.text}>Estatísticas:</Text>
      <Text style={styles.text}>Maior Altura: {maxHeight} cm</Text>
      <Text style={styles.text}>Menor Altura: {minHeight} cm</Text>
      <Text style={styles.text}>Média de Altura das Mulheres: {averageHeightWomen} cm</Text>
      <Text style={styles.text}>Número de Homens: {numMen}</Text>
      <Text style={styles.text}>Porcentagem de Homens: {percentageMen}%</Text>
      <Text style={styles.text}>Porcentagem de Mulheres: {percentageWomen}%</Text>
      <Text style={styles.text}>
        Porcentagem de Mulheres de 18 a 35 anos com olhos verdes e cabelos louros: {percentageGreenEyedBlondeWomen}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 25,
  },
  text: {
    fontSize: 19,
  },
});

export default PopulationSurveyApp;
