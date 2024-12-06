import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getBooks, putBook } from './api/Api';







export default function EmprestarLivro() {
  const [id, setId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [books, setBooks] = useState([]);







  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        const availableBooks = response.filter(book => !book.Emprestado);
        setBooks(availableBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };



    fetchBooks();
  }, []);





  const Emprestar = async () => {
    try {
      if (!id || !usuarioId) {
        alert('Por favor, insira um ID de livro e de usuário válidos.');
        return;
      }

      await putBook(id, usuarioId);
      alert('Livro emprestado com sucesso!');
      setId('');
      setUsuarioId('');






      const updatedBooks = await getBooks();
      setBooks(updatedBooks);

    } catch (error) {
      console.error('Erro ao emprestar livro:', error);
      alert('Erro ao emprestar livro!');
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




      <View style={styles.menuemprestar}>

        <Text style={styles.title}>EMPRESTAR NOVO LIVRO</Text>




        <ScrollView>
          {books.length > 0 ? (
            books.map((book) => (

              <View key={book.id} style={styles.bookItem}>

              <Text style={styles.bookText}>
              {"ID do livro:"}{book.id} {"\n"}
              {"Titulo do livro:"}  {book.titulo} {"\n"}
              {"Autor do livro:"} {book.autor} {"\n"}
              {"Ano do livro:"}  {book.ano} {"\n"}
              {"Quantidade disponível:"}  {book.quantidade} {"\n"}
              {"Quantidade emprestada:"}  {book.quantidadeEmprestada} {"\n"}
              {"Emprestado para:"}  {book.usuariosEmprestados} {"\n"}
              </Text>

              </View>
            ))
          ) : (
            <Text style={styles.bookText}>Não há livros disponíveis.</Text>
          )}
        </ScrollView>




        <TextInput
          style={styles.input}
          placeholder="ID do Livro"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="ID do Usuário"
          value={usuarioId}
          onChangeText={setUsuarioId}
          keyboardType="numeric"
        />
        <Button title="Emprestar Livro" color="darkgreen" onPress={Emprestar} />
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
  menuemprestar: {
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
    color: 'black',
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
