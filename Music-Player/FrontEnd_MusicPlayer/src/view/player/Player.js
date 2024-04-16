import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const listaDeMusicas = [
  { nome: 'Legião Urbana - Teatro dos Vampiros', arquivo: require('./musicas/musica01.mp3') },
  { nome: 'Lobão - Me Chama', arquivo: require('./musicas/musica02.mp3') },
  { nome: 'Kid Abelha - Os outros', arquivo: require('./musicas/musica03.mp3') },
];

const Player = () => {
  const [som, setSom] = useState();
  const [estaTocando, setEstaTocando] = useState(false);
  const [duracao, setDuracao] = useState(0);
  const [posicao, setPosicao] = useState(0);
  const [indiceMusicaAtual, setIndiceMusicaAtual] = useState(0);
  const [estaCarregando, setEstaCarregando] = useState(false);
  const [mensagemLog, setMensagemLog] = useState(null);
  const [totalMusicas, setTotalMusicas] = useState(listaDeMusicas.length);

  const carregarSom = async () => {
    try {
      setEstaCarregando(true);
      console.log('Carregando Som');
      const { sound } = await Audio.Sound.createAsync(listaDeMusicas[indiceMusicaAtual].arquivo, {}, (status) => {
        if (status.isLoaded) {
          setDuracao(status.durationMillis);
          setEstaCarregando(false);
        } else {
          //console.warn('Erro ao carregar som:', status.error);
          setEstaCarregando(false);
        }
      });

      setSom(sound);
      logParaUsuario('Clique em "Tocar" para iniciar a reprodução.');
    } catch (error) {
      //console.error('Erro ao carregar som:', error);
      setSom(null);
      setEstaCarregando(false);
    }
  };

  const tocarPausarSom = async () => {
    try {
      if (!som) {
        await carregarSom();
      }

      if (som) {
        const status = await som.getStatusAsync();
        setDuracao(status.durationMillis);

        if (status.isLoaded) {
          if (estaTocando) {
            await som.pauseAsync();
          } else {
            console.log('Tocando Som');
            await som.playAsync();
          }
          setEstaTocando(!estaTocando);
        } else {
          //console.warn('Erro ao carregar som.');
        }
      }
    } catch (error) {
      //console.error('Erro ao tocar/pausar som:', error);
    }
  };

  const handleTrocarMusica = async (novoIndice) => {
    if (som) {
      await som.stopAsync();
      await som.unloadAsync();
    }

    setIndiceMusicaAtual(novoIndice);
    setSom(null);
    setPosicao(0);
    logParaUsuario('Clique em "Carregar" para confirmar a escolha da música.');
  };

  useEffect(() => {
    const atualizarPosicao = async () => {
      if (som) {
        const status = await som.getStatusAsync();
        setPosicao(status.positionMillis);
      }
    };

    const intervalo = setInterval(atualizarPosicao, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [som]);

  const handleMudarSlider = async (valor) => {
    if (som) {
      await som.setPositionAsync(valor);
      setPosicao(valor);
    }
  };

  const formatarTempo = (milissegundos) => {
    const minutos = Math.floor(milissegundos / 60000);
    const segundos = ((milissegundos % 60000) / 1000).toFixed(0);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  };

  const logParaUsuario = (mensagem) => {
    setMensagemLog(mensagem);
    setTimeout(() => {
      setMensagemLog(null);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Música: {listaDeMusicas[indiceMusicaAtual].nome}</Text>

      <Text style={styles.totalMusicas}>Total de Músicas: {totalMusicas}</Text>

      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelsContainer}>
          <Text style={styles.sliderLabel}>{formatarTempo(posicao)}</Text>
          <Text style={styles.sliderLabel}>{formatarTempo(duracao)}</Text>
        </View>
        
        <Slider
          style={styles.slider}
          value={posicao}
          maximumValue={duracao}
          minimumValue={0}
          step={1000}
          onValueChange={handleMudarSlider}
          minimumTrackTintColor={'white'}
          thumbStyle={styles.thumbStyle}
        />
      </View>

      <View style={styles.containerBotoes}>
        <View style={styles.botaoContainer}>
          <Button style={styles.botao} title={estaTocando ? 'Pausar' : 'Tocar'} onPress={tocarPausarSom} color='gray' />
        </View>
        <View style={styles.botaoContainer}>
          <Button style={styles.botao} title="Carregar" onPress={carregarSom} color='gray' />
        </View>
        {estaCarregando && <ActivityIndicator size="large" color="#0000ff" />}
      </View>

      <View style={styles.containerBotoesMusicas}>
        {listaDeMusicas.map((_, index) => (
          <View key={index} style={styles.botaoContainer}>
            <Button
              key={index}
              title={`Música ${index + 1}`}
              onPress={() => handleTrocarMusica(index)}
              disabled={index === indiceMusicaAtual}
              color='black'
            />
          </View>
        ))}
      </View>

      {mensagemLog && (
        <View style={[styles.mensagemLog, { backgroundColor: mensagemLog.includes('"Carregar"') ? 'rgba(150, 0, 0, 0.7)' : 'rgba(200, 0, 0, 0.7)' }]}>
          <Text style={styles.textoMensagemLog}>{mensagemLog}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBotoes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  texto: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  totalMusicas: {
    fontSize: 20,
    marginVertical: 10,
  },
  botaoContainer: {
    marginHorizontal: 10,
  },
  sliderContainer: {
    width: '80%',
    marginTop: 45,
  },
  slider: {
    height: 40,
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  thumbStyle: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  containerBotoesMusicas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  mensagemLog: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  textoMensagemLog: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Player;
