import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,} from 'react-native';
import { supabase }from '../utils/supabase';

export default function HomeScreen() {

  async function logout() {

    await supabase.auth.signOut();

  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.titulo}>
          UniCopa
        </Text>

        <TouchableOpacity
          style={styles.botaoLogout}
          onPress={logout}
        >

          <Text style={styles.textoLogout}>
            Sair
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.conteudo}>

        <Text style={styles.texto}>
          Tela principal dos jogos
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#009C3B',
  },

  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  botaoLogout: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  textoLogout: {
    color: '#009C3B',
    fontWeight: 'bold',
  },

  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  texto: {
    fontSize: 18,
  },

});