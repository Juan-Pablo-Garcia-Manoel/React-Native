import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Formulario from './src/componente/formulario/formulario';
import Cabecalho from './src/componente/cabecalho/cabecalho';

export default function App() {
  
  return (
    
    <View style={styles.container}>
      
      <StatusBar />
      
      <View style={styles.cabecalho}>
        <Cabecalho 
        titulo="Votação representante de turma" 
        nome="Juan Pablo Garcia Manoel" />

      </View>

      <View style={styles.main}>
        
        <Formulario/>

      </View>


      <View style={styles.footer}>

        
        
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //display: 'flex',
  },
  cabecalho:{
    // flex: 1,
    backgroundColor: '#fff',
    height: 250,
    minWidth: '100%',
    padding: 40
  },
  main:{    
    flex: 1,
    // flexGrow: 1,
    backgroundColor: 'grey',
    minWidth: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 35,

  },
  footer:{
    // flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    padding: 15
  }
});

