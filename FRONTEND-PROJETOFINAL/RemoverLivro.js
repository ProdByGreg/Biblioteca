import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { getBooks, deleteBook } from './api/Api';







export default function RemoverLivros() {
  const [id, setId] = useState('');
  const [books, setBooks] = useState([]);








  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };





    fetchBooks();
  }, []);





  const Remove = async () => {
    try {
      if (!id) {
        alert('Por favor, insira um ID de livro válido.');
        return;
      }
  
      await deleteBook(id);
      alert('Livro removido com sucesso!');
      setId('');
  

      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
  
    } catch (error) {
      console.error('Erro ao remover livro:', error);
      alert('Erro ao remover livro!');
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

        <Text style={styles.title}>REMOVER LIVRO</Text>





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

              ))) : (
                
              <Text style={styles.bookText}>Não há livros para exibir.</Text>
            )}
          </ScrollView>




          <TextInput
            style={styles.input}
            placeholder="ID do Livro"
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
          />




          <Button title="Remover Livro" color="red" onPress={Remove} />
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
