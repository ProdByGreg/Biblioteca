import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { postRequest } from './api/Api';
import { useNavigation } from '@react-navigation/native';

export default function Usuarios() {
  const navigation = useNavigation("");

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const handleSalvar = async () => {
    if (!nome || !idade) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const usuario = {
      Nome: nome,
      Idade: parseInt(idade),
    };

    try {
      await postRequest(usuario, 'Usuarios');
      alert('Usuário adicionado com sucesso!');
      setNome('');
      setIdade('');
    } catch (error) {
      console.error('Erro ao adicionar o usuário:', error);
      alert('Erro ao adicionar o usuário. Tente novamente.');
    }
  };

  return (
    <View style={styles.body}>

      <View style={styles.menuhorizontal}>

        <Button 
          title="Início" 
          color="darkgreen" 
          onPress={() => navigation.navigate('Inicio')}
        />

        <Button 
          title="Usuarios"
          color="darkgreen"
          onPress={() => navigation.navigate('Usuario')}
        />

        <Button 
          title="Informação" 
          color="darkgreen" 
          onPress={() => navigation.navigate('Info')}
        />

        <Button 
          title="Créditos" 
          color="darkgreen" 
          onPress={() => navigation.navigate('Creditos')}
        />

      </View>

      <View style={styles.menuadd}>

        <Text style={styles.title}>ADICIONAR NOVO USUÁRIO</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Usuário"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Idade do Usuário"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />

        <Button
          title="Salvar"
          color="darkgreen"
          onPress={handleSalvar}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rebeccapurple',
    padding: 16,
  },
  menuadd: {
    backgroundColor: 'rgb(128, 21, 199)',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 80,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'black',
  },
  menuhorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
});
