import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameCard from './GameCards';
import { formatarData } from '../utils/DateFormat';

<GameCards
  game={item}
  onToggleFavorito={onToggleFavorito}
/>

export default function DiaCard({
  data,
  jogos,
  onToggleFavorito
}) {

  return (
    <View style={styles.card}>

      <Text style={styles.data}>
        {formatarData(data)}
      </Text>

      {
        jogos.map((jogo) => (
          <GameCard
            key={jogo.id}
            game={jogo}
            onToggleFavorito={onToggleFavorito}
          />
        ))
      }

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: '#0c1b2a',
    width: 320,
    borderRadius: 12,
    padding: 15,
  },

  data: {
    color: '#f2cc2f',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
});
