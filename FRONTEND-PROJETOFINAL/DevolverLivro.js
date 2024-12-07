import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { getBooks, putBook2 } from './api/Api';







export default function DevolverLivro() {
  const [id, setId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [books, setBooks] = useState([]);






  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();

        const borrowedBooks = response.filter(book => !book.Emprestado);
        setBooks(borrowedBooks);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }};



    fetchBooks();
  }, []);





  const Devolver = async () => {
    try {
      if (!id || !usuarioId) {
        alert('Por favor, insira um ID de livro e de usuário válidos.');
        return;
      }

      await putBook2(id, usuarioId);
      alert('Livro devolvido com sucesso!');
      setId('');
      setUsuarioId('');






      const updatedBooks2 = await getBooks();
      setBooks(updatedBooks2);

    } catch (error) {
      console.error('Erro ao devolver livro:', error);
      alert('Erro ao devolver livro!');
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





      <View style={styles.menudevolver}>

        <Text style={styles.title}>DEVOLVER LIVRO</Text>




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
              {"Emprestado para o usuario de ID:"}  {book.usuariosEmprestados.join(", ")} {"\n"}
              </Text>

              </View>
            ))
          ) : (
            <Text style={styles.bookText2}>Não há livros emprestados.</Text>
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
        <Button title="Devolver Livro" color="darkgreen" onPress={Devolver} />
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
  menudevolver: {
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
  bookText2: {
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
