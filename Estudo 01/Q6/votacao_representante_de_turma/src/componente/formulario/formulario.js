import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const VotingApp = () => {
  const [students, setStudents] = useState([
    { name: 'Zezin', votes: 0 },
    { name: 'Maria', votes: 0 },
    { name: 'João', votes: 0 },
  ]);

  const [winner, setWinner] = useState(null);

  const totalVotes = students.reduce((total, student) => total + student.votes, 0);

  const voteForStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].votes++;
    setStudents(updatedStudents);

    // Encontre o participante com o maior número de votos
    const maxVotes = Math.max(...updatedStudents.map((student) => student.votes));
    const potentialWinners = updatedStudents.filter((student) => student.votes === maxVotes);

    if (potentialWinners.length === 1) {
      setWinner(potentialWinners[0]);
    } else {
      setWinner(null); // Empate, nenhum vencedor ainda
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vote para seu representante de turma:</Text>
      {students.map((student, index) => (
        <View key={index} style={styles.studentContainer}>
          <Text>{student.name}</Text>
          <Button title="Votar" onPress={() => voteForStudent(index)} />
          <Text>Votos: {student.votes}</Text>
        </View>
      ))}
      {winner && (
        <View style={styles.winnerContainer}>
          <Text>O representante da turma é: {winner.name}</Text>
          <Text>Percentual de Votos: {(winner.votes / totalVotes) * 100}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  studentContainer: {
    padding: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  winnerContainer: {
    marginTop: 100,
  },
  text: {
    fontSize: 25,
  },
});

export default VotingApp;
