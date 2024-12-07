import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { postBook } from './api/Api';







export default function AdicionarLivro() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [quantidade, setQuantidade] = useState('');






  const Salvar = async () => {
    if (!titulo || !autor || !ano || !quantidade) {
      alert('Por favor, preencha todos os campos!');
      return;
    }





    const livro = {
      Titulo: titulo,
      Autor: autor,
      Ano: ano,
      Quantidade: quantidade,
      Emprestado: false,
    };






    try {
      await postBook(livro);
      alert('Livro adicionado com sucesso!');
      setTitulo('');
      setAutor('');
      setAno('');
      setQuantidade('');
    } catch (error) {
      console.error('Erro ao adicionar o livro:', error);
      alert('Erro ao adicionar o livro. Tente novamente.');
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







      <View style={styles.menuadd}>

        <Text style={styles.title}>ADICIONAR NOVO LIVRO</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Livro"
          value={titulo}
          onChangeText={setTitulo}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Autor do Livro"
          value={autor}
          onChangeText={setAutor}
        />

        <TextInput
          style={styles.input}
          placeholder="Ano do Livro"
          value={ano}
          onChangeText={setAno}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
        




        <View style={styles.buttonGroup}>

        <Button 
        title="Adicionar livro" 
        color="darkgreen" 
        onPress={Salvar} 
        />

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
  buttonGroup: {
    gap: 10,
  },
});
