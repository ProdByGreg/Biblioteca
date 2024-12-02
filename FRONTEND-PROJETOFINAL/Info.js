import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation("");

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
      

      <View style={styles.menuinfo}>

        <Text style={styles.title}>INFORMAÇÕES</Text>
        <Text style={styles.info}>
            PROJETO DESENVOLVIDO AFIM DE
            AGILIZAR O PROCESSO DE GERENCIAMENTO
            DE LIVROS DE UMA BIBLIOTECA.</Text>
        <Text style={styles.info2}>
            PROJETO DESENVOLVIDO COM
            JAVASCRIPT PARA FRONT-END
            E C# NO ASP.NET CORE PARA
            DESENVOLVIMENTO DA 
            API NO BACK-END.</Text>
        

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
  menuinfo: {
    backgroundColor: 'rgb(128, 21, 199)',
    padding: 30,
    marginVertical: 20,
    borderRadius: 8,
    marginTop: 80,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  info: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  info2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 15,
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
