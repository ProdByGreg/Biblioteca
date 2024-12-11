import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { seeBooks } from './api/Api';
import { useNavigation } from '@react-navigation/native';






export default function VerLivros() {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);






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






  const Expand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };






  return (
    <View style={styles.body}>

      <View style={styles.menuview}>

        <Text style={styles.title}>Ver Livros</Text>



        <ScrollView>


          {books.length > 0 ? (
            books.map(book => (

              <View key={book.id} style={styles.bookItem}>


                <TouchableOpacity onPress={() => Expand(book.id)}>

                  <Text style={styles.bookButton}>
                    Título do livro: {book.titulo}
                  </Text>

                </TouchableOpacity>



                {expandedBook === book.id && (

                  <View style={styles.detalhes}>

                    <Text style={styles.bookText}>
                      ID do livro: {book.id}
                    </Text>

                    <Text style={styles.bookText}>
                      Título: {book.titulo}
                    </Text>

                    <Text style={styles.bookText}>
                      Autor: {book.autor}
                    </Text>

                    <Text style={styles.bookText}>
                      Ano: {book.ano}
                    </Text>

                    <Text style={styles.bookText}>
                      Quantidade disponível: {book.quantidade}
                    </Text>

                    <Text style={styles.bookText}>
                      Quantidade emprestada: {book.quantidadeEmprestada}
                    </Text>

                    <Text style={styles.bookText}>
                      Emprestado para usuários com ID's: {book.usuariosEmprestados.join(', ')}
                    </Text>

                  </View>

                )}

              </View>

            ))

          ) : (

            <Text style={styles.bookText2}>Não há livros emprestados.</Text>

          )}


        </ScrollView>





          <Button
            title="VOLTAR"
            color="black"
            onPress={() => navigation.navigate('Inicio')}
          />

      </View>

    </View>

  );
}






const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  menuview: {
    height: 500,
    backgroundColor: 'rgb(0, 0, 128)',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 10,
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
  bookButton: {
    height: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  detalhes: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'lightgrey',
    borderRadius: 4,
  },
  bookText: {
    fontSize: 16,
    color: 'black',
  },
  bookText2: {
    fontSize: 16,
    color: 'white',
  },
});
