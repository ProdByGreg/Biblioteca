import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { getUsers } from './api/Api';
import { useNavigation } from '@react-navigation/native';






export default function VerUsuarios() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);







  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response)
        setUsers(response);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };





    fetchUsers();
  }, []);

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

      <View style={styles.menuview}>

        <Text style={styles.title}>Ver Usuários</Text>

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
                
              <Text style={styles.userText2}>Não há usuários para exibir.</Text>
            )}
          </ScrollView>

        <View style={styles.button}>
          <Button
            title="VOLTAR"
            color="darkgreen"
            onPress={() => navigation.navigate('Inicio')}
          />
        </View>

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
  menuview: {
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