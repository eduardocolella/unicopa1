import { Image, StyleSheet, Text, View } from 'react-native';
import { flags } from '../utils/flags.js';
import { TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';
import { useEffect, useState } from 'react';



export default function GameCards({ game }) {

  const [favorito, setFavorito] = useState(false);

useEffect(() => {
  verificarFavorito();
}, []);

async function verificarFavorito() {

  const { data } = await supabase
    .from('favoritos')
    .select('*')
    .eq('jogo_id', game.id)
    .maybeSingle();

  setFavorito(!!data);
}

async function toggleFavorito() {

  if (favorito) {

    await supabase
      .from('favoritos')
      .delete()
      .eq('jogo_id', game.id);

    setFavorito(false);

  } else {

    await supabase
      .from('favoritos')
      .insert({
        jogo_id: game.id
      });

    setFavorito(true);
  }
}

  const isBrazilHome = game.sigla_casa === 'BRA';
  const isBrazilAway = game.sigla_fora === 'BRA';

  return (
    <View style={styles.jogo}>

      <Text style={styles.grupo}>
        GRUPO {game.grupo} {game.confronto}
      </Text>

      <View style={styles.linhaPrincipal}>


        <View style={styles.time}>
          <Image
            style={[
              styles.bandeira,
              isBrazilHome && styles.bandeiraBRA
            ]}
            source={flags[game.sigla_casa]}
          />

          <TouchableOpacity
            onPress={() => toggleFavorito(game.id, game.favorito)}
          >
            <Text style={{ fontSize: 24 }}>
              {favorito ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.sigla,
              isBrazilHome && styles.siglaBRA
            ]}
          >
            {game.sigla_casa}
          </Text>
        </View>


        <View style={styles.horario}>
          <Text style={styles.hora}>{game.hora_brasilia}</Text>
          <Text style={styles.subTitulo}>VS</Text>
        </View>


        <View style={styles.time}>
          <Text
            style={[
              styles.sigla,
              isBrazilAway && styles.siglaBRA
            ]}
          >
            {game.sigla_fora}
          </Text>

          <Image
            style={[
              styles.bandeira,
              isBrazilAway && styles.bandeiraBRA
            ]}
            source={flags[game.sigla_fora]}
          />
        </View>

      </View>

      <View style={styles.local}>
        <Text style={styles.subTitulo}>{game.estadio}</Text>

        <Text style={styles.subTitulo}>
          {game.cidade} • {game.pais}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  jogo: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2d3d',
    paddingBottom: 15
  },

  grupo: {
    color: '#8fa3b8',
    fontSize: 12,
    marginBottom: 10
  },

  linhaPrincipal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  bandeira: {
    width: 28,
    height: 28,
    borderRadius: 14
  },

  bandeiraBRA: {
    borderWidth: 2,
    borderColor: '#FFDF00',
    transform: [{ scale: 1.08 }]
  },

  sigla: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },

  siglaBRA: {
    color: '#FFDF00',
    textShadowColor: '#009739',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    fontSize: 18
  },

  horario: {
    alignItems: 'center'
  },

  hora: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  local: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  subTitulo: {
    color: '#8fa3b8',
    fontSize: 12
  }
});
