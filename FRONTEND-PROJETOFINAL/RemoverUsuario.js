import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { getUsers, deleteUser } from './api/Api';







export default function RemoverLivros() {
  const [id, setId] = useState('');
  const [users, setUser] = useState([]);








  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUser(response);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };





    fetchUsers();
  }, []);





  const Remove = async () => {
    try {
      if (!id) {
        alert('Por favor, insira um ID de usuario válido.');
        return;
      }
  
      await deleteUser(id);
      alert('Usuário removido com sucesso!');
      setId('');
  

      const updateUsers = await getUsers();
      setBooks(updateUsers);
  
    } catch (error) {
      console.error('Erro ao remover usuario:', error);
      alert('Erro ao remover usuario!');
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
      onPress={() => navigation.navigate('Usuarios')}
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






        <View style={styles.menuremover}>

        <Text style={styles.title}>REMOVER USUARIO</Text>





        <ScrollView>
          {users.length > 0 ? (
            users.map((user) => (

              <View key={user.id} style={styles.userItem}>

              <Text style={styles.userText}>
              {"ID do usuário:"}{user.id} {"\n"}
              {"Nome do usuário:"}  {user.nome} {"\n"}
              {"Telefone do usuário:"} {user.telefone} {"\n"}
              {"Idade do usuário:"}  {user.idade} {"\n"}
              </Text>

              </View>

              ))) : (
                
              <Text style={styles.userText2}>Não há usuários para remover.</Text>
            )}
          </ScrollView>




          <TextInput
            style={styles.input}
            placeholder="ID do Usuário"
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
          />




          <Button title="Remover Usuario" color="red" onPress={Remove} />
        </View>
      </View>
  );}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rebeccapurple',
    padding: 16,
  },
  menuremover: {
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
  userItem: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  userText: {
    fontSize: 16,
    color: 'black',
  },
  userText2: {
    fontSize: 16,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
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
