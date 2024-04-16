import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const RetirementQualificationApp = () => {
  const [age, setAge] = useState('');
  const [yearsWorked, setYearsWorked] = useState('');
  const [isQualified, setIsQualified] = useState(false);

  const checkQualification = () => {
    const parsedAge = parseInt(age);
    const parsedYearsWorked = parseInt(yearsWorked);

    if (!isNaN(parsedAge) && !isNaN(parsedYearsWorked)) {
      if (parsedAge >= 65 || (parsedAge >= 60 && parsedYearsWorked >= 25) || parsedYearsWorked >= 30) {
        setIsQualified(true);
      } else {
        setIsQualified(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verifique a qualificação para a aposentadoria:</Text>
      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <Text style={styles.label}>Anos trabalhados:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={yearsWorked}
        onChangeText={(text) => setYearsWorked(text)}
      />
      <View style={styles.centeredContent}>
        <Button title="Verificar Qualificação" color="black" onPress={checkQualification} />
        {isQualified !== undefined && (
          <Text style={styles.result}>
            {isQualified ? 'Está qualificado para a aposentadoria' : 'Não está qualificado para a aposentadoria'}
          </Text>
        )}
      </View>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:'15%'
  },
  text: {
    fontSize: 20,
    flex:1
  },
  label: {
    fontSize: 15,
    alignItems: '',
  },
  result: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default RetirementQualificationApp;
