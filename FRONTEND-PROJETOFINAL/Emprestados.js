import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { seeBooks } from './api/Api';
import { useNavigation } from '@react-navigation/native';






export default function VerLivros() {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);







  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await seeBooks();
        const filteredBooks = response.filter(book => book.quantidadeEmprestada > 0);
        setBooks(filteredBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };





    fetchBooks();
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




        <Text style={styles.title}>Ver Livros</Text>

        <ScrollView>

          {books.length > 0 ? (

            books.map(book => (

              <View key={book.id} style={styles.bookItem}>

                <Text style={styles.bookText}>

                  {"ID do livro:"} {book.id} {"\n"}
                  {"Titulo do livro:"} {book.titulo} {"\n"}
                  {"Autor do livro:"} {book.autor} {"\n"}
                  {"Ano do livro:"} {book.ano} {"\n"}
                  {"Quantidade disponível:"} {book.quantidade} {"\n"}
                  {"Quantidade emprestada:"} {book.quantidadeEmprestada} {"\n"}
                  {"Emprestado para usuarios com ID's:"} {book.usuariosEmprestados.join(", ")} {"\n"}

                </Text>

              </View>
            ))

          ) : (

            <Text style={styles.bookText2}>Não há livros emprestados.</Text>
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
  bookItem: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  bookText: {
    fontSize: 16,
    color: 'black'
  },
  bookText2: {
    fontSize: 16,
    color: 'white'
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