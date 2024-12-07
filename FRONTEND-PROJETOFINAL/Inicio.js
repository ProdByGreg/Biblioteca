import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation("");

  return (
    <View style={styles.body}>


      <View style={styles.menu}>

        <Text style={styles.title}>GERENCIADOR DE LIVROS</Text>

        <View style={styles.button}>
          <Button
            title="Ver livros"
            color="darkgreen"
            onPress={() => navigation.navigate('VerLivros')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Adicionar livro"
            color="darkgreen"
            onPress={() => navigation.navigate('AdicionarLivro')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Emprestar Livro"
            color="darkgreen"
            onPress={() => navigation.navigate('EmprestarLivro')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Devolver Livro"
            color="darkgreen"
            onPress={() => navigation.navigate('DevolverLivro')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Ver emprestados"
            color="darkgreen"
            onPress={() => navigation.navigate('Emprestados')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Remover Livro"
            color="darkgreen"
            onPress={() => navigation.navigate('RemoverLivro')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Usuários"
            color="darkgreen"
            onPress={() => navigation.navigate('Usuarios')}
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
  menu: {
    backgroundColor: 'rgb(128, 21, 199)',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 40,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 15,
  },
});
