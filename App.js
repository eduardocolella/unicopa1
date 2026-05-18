import { StyleSheet, Text, View, Image, ImageBackground, SectionList } from 'react-native';
import dados from './assets/dados.json'
import GameCards from './components/GameCards';
import DiaCard from './components/DiaCard';
import formatarData from './utils/DateFormat';
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';

<DiaCard
  data={section.title}
  jogos={section.data}
  onToggleFavorito={alternarFavorito}
/>

export default function App() {

  const [jogos, setJogos] = useState([])

  useEffect(() => {
  async function carregarJogos() {

    const { data, error } = await supabase
      .from('jogos')
      .select('*')
      .order('data_brasilia', { ascending: true })
      .order('hora_brasilia', { ascending: true })

    if (!error) {
      setJogos(data)
    }
  }

  carregarJogos()
}, [])

  const agruparPorData = (jogos) => {
    return jogos.reduce((acc, jogo) => {

      const data = jogo.data_brasilia

      if (!acc[data]) {
        acc[data] = []
      }

      acc[data].push(jogo)

      return acc

    }, {})
  }

  const jogosAgrupados = agruparPorData(jogos);

  const jogosTratados = Object.keys(jogosAgrupados).map(data => {
    return {
      title: data,
      data: jogosAgrupados[data]
    }
  });

return (
    <ImageBackground style={styles.container}
      source={require('./assets/bg-overlay.png')}>
      <Image style={styles.logo}
        source={require('./assets/unicopa.png')}
      />

      <Text style={styles.title}>CALENDÁRIO</Text>

      {jogos.length === 0 ? (

  <View style={styles.emptyCard}>
    <Text style={styles.emptyText}>
      Nenhum jogo carregado
    </Text>
  </View>

) : (

  <SectionList
    sections={jogosTratados}
    keyExtractor={(item) => item.id.toString()}
    renderItem={() => null}
    renderSectionHeader={({ section }) => (
      <DiaCard
        data={section.title}
        jogos={section.data}
      />
    )}
  />

)
}

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#040b13',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 50,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
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

  jogo: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2d3d',
    paddingBottom: 15
  },
  emptyCard: {
  marginTop: 30,
  width: 320,
  backgroundColor: '#0c1b2a',
  borderRadius: 12,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
  emptyText: {
  color: 'white',
  fontSize: 18,
  fontWeight: '600',
},
});
const alternarFavorito = async (id, favoritoAtual) => {

  const novoValor = !favoritoAtual;

  const { error } = await supabase
    .from('jogos')
    .update({
      favorito: novoValor
    })
    .eq('id', id);

  if (!error) {

    const jogosAtualizados = jogos.map(jogo => {

      if (jogo.id === id) {
        return {
          ...jogo,
          favorito: novoValor
        }
      }

      return jogo;
    });

    setJogos(jogosAtualizados);
  }
}; 