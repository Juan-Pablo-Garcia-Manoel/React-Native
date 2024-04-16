import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const SalaryCalculatorApp = () => {
  const [hoursWorked, setHoursWorked] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [dependents, setDependents] = useState('');
  const [grossSalary, setGrossSalary] = useState(0);
  const [inssDiscount, setInssDiscount] = useState(0);
  const [irDiscount, setIrDiscount] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  const calculateSalary = () => {
    const hours = parseFloat(hoursWorked);
    const rate = parseFloat(hourlyRate);
    const numDependents = parseInt(dependents);

    const gross = hours * rate + 50 * numDependents;
    setGrossSalary(gross);

    let inss = 0;
    if (gross <= 1000) {
      inss = gross * 0.085;
    } else {
      inss = gross * 0.09;
    }
    setInssDiscount(inss);

    let ir = 0;
    if (gross <= 500) {
      ir = 0;
    } else if (gross > 500 && gross <= 1000) {
      ir = gross * 0.05;
    } else {
      ir = gross * 0.07;
    }
    setIrDiscount(ir);

    const net = gross - inss - ir;
    setNetSalary(net);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Informe a quantidade de horas trabalhadas:</Text>
      <TextInput
        style={styles.input}
        value={hoursWorked}
        onChangeText={(text) => setHoursWorked(text)}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Informe o salário por hora:</Text>
      <TextInput
        style={styles.input}
        value={hourlyRate}
        onChangeText={(text) => setHourlyRate(text)}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Informe o número de dependentes:</Text>
      <TextInput
        style={styles.input}
        value={dependents}
        onChangeText={(text) => setDependents(text)}
        keyboardType="numeric"
      />

      <View style={styles.centeredContent}>
        <Button title="Calcular" color="black" onPress={calculateSalary} />
      </View>

      <Text style={styles.result}>Informações de Cálculo:</Text>
      <Text>Salário Bruto: R${grossSalary}</Text>
      <Text>Desconto INSS: R${inssDiscount}</Text>
      <Text>Desconto IR: R${irDiscount}</Text>
      <Text>Salário Líquido: R${netSalary}</Text>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  centeredContent: {
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default SalaryCalculatorApp;
