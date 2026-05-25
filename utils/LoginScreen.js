import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, } from 'react-native';
import { supabase } from '../utils/supabase';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function fazerLogin() {

    if (!email || !senha) {
      Alert.alert(
        'Erro',  'Preencha e-mail e senha'
      );
      return;
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
      Alert.alert(
        'Erro',
        'Digite um e-mail válido'
      );
      return;
    }

    try {

      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });

      if (error) {
        Alert.alert(
          'Erro ao entrar',
          'E-mail ou senha inválidos'
        );
        return;
      }

      navigation.replace('Home');

    } catch (err) {

      Alert.alert(
        'Erro',
        'Não foi possível fazer login'
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        UniCopa
      </Text>

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={fazerLogin}
        disabled={loading}
      >
        <Text style={styles.botaoTexto}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },

  botao: {
    backgroundColor: '#009C3B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});