import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, TextInput } from 'react-native';
import RNFS from 'react-native-fs';




export default function App() {



  const [inputValue, setInputValue] = useState("1");

  const [USD, setUSD] = useState(null);
  const [EUR, setEUR] = useState(null);
  const [GBP, setGBP] = useState(null);
  const [CZK, setCZK] = useState(null);
  const [HUF, setHUF] = useState(null);
  const [TRY, setTRY] = useState(null);
  const [BGN, setBGN] = useState(null);
  const [DKK, setDKK] = useState(null);
  const [RON, setRON] = useState(null);
  const [SEK, setSEK] = useState(null);
  const [CHF, setCHF] = useState(null);
  
  const fs = require('fs');
  
  

  const saveDataToFile = async (data, filename) => {
    const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    try {
      await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
      console.log('Data saved to file:', path);
    } catch (error) {
      console.error('Error saving data to file:', error);
    }
  };
  const readDataFromFile = async (filename) => {
    const path = `${RNFS.DocumentDirectoryPath}/${filename}`;
    try {
      const fileContent = await RNFS.readFile(path, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading data from file:', error);
      return null;
    }
  };






  // pobieranie info z API
  useEffect(() => {
      const savedData = readDataFromFile('currencyData.json');
        if (savedData) {
          setUSD(savedData.quotes.PLNUSD)
          setEUR(savedData.quotes.PLNEUR)
          setGBP(savedData.quotes.PLNGBP)
          setCZK(savedData.quotes.PLNCZK)
          setHUF(savedData.quotes.PLNHUF)
          setTRY(savedData.quotes.PLNTRY)
          setBGN(savedData.quotes.PLNBGN)
          setDKK(savedData.quotes.PLNDKK)
          setRON(savedData.quotes.PLNRON)
          setSEK(savedData.quotes.PLNSEK)
          setCHF(savedData.quotes.PLNCHF)
        }
    // fetch('http://apilayer.net/api/live?access_key=5045099071835e8a9c3b4a49a43df72e&currencies=USD,EUR,GBP,CZK,HUF,TRY,BGN,DKK,RON,SEK,CHF&source=PLN', {
    // method: 'GET',
    // headers: {
    //   "Accept": 'application/json',
    //   "Content-Type": 'application/json; charset=utf-8',
    // }
    // })
    // .then(response => {
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    // return response.json();
    // })
    // .then(data => {
    //   saveDataToFile(data, 'currencyData.json');
    //   const stringedData = JSON.stringify(data)
    //   const parsedData = JSON.parse(stringedData)
    //   saveDataToFile(data, 'currencyData.json');
    //   setUSD(parsedData.quotes.PLNUSD)
    //   setEUR(parsedData.quotes.PLNEUR)
    //   setGBP(parsedData.quotes.PLNGBP)
    //   setCZK(parsedData.quotes.PLNCZK)
    //   setHUF(parsedData.quotes.PLNHUF)
    //   setTRY(parsedData.quotes.PLNTRY)
    //   setBGN(parsedData.quotes.PLNBGN)
    //   setDKK(parsedData.quotes.PLNDKK)
    //   setRON(parsedData.quotes.PLNRON)
    //   setSEK(parsedData.quotes.PLNSEK)
    //   setCHF(parsedData.quotes.PLNCHF)
    // })
    // .catch(error => {
    //   console.error('There has been a problem with your fetch operation:', error);
    //   Alert.alert('Error', 'Failed to fetch data.');
    // });
  }, []);





  // sprawdzanie czy wprowadzony tekst jest liczbą i zapisanie wartości
  function onChanged(text) {
    let tempText = '';
    let numbers = '0123456789';
   
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        tempText = tempText + text[i];
      }
    }

    setInputValue(tempText);
  }

  



  return (
    <View style={styles.container}>


      <Text>Podaj ilość PLN:</Text>
      <TextInput 
        placeholder='PLN'
        value={inputValue}
        onChangeText={(text) => onChanged(text)}
        style={styles.inputBox}
        maxLength={18}
      />
      


      <Text style={styles.outputText}>USD: { (inputValue * USD).toFixed(5) }</Text>
      <Text style={styles.outputText}>EUR: { (inputValue * EUR).toFixed(5) }</Text>
      <Text style={styles.outputText}>GBP: { (inputValue * GBP).toFixed(5) }</Text>
      <Text style={styles.outputText}>CZK: { (inputValue * CZK).toFixed(5) }</Text>
      <Text style={styles.outputText}>HUF: { (inputValue * HUF).toFixed(5) }</Text>
      <Text style={styles.outputText}>TRY: { (inputValue * TRY).toFixed(5) }</Text>
      <Text style={styles.outputText}>BGN: { (inputValue * BGN).toFixed(5) }</Text>
      <Text style={styles.outputText}>DKK: { (inputValue * DKK).toFixed(5) }</Text>
      <Text style={styles.outputText}>RON: { (inputValue * RON).toFixed(5) }</Text>
      <Text style={styles.outputText}>SEK: { (inputValue * SEK).toFixed(5) }</Text>
      <Text style={styles.outputText}>CHF: { (inputValue * CHF).toFixed(5) }</Text>


    </View>
  );

  

}





const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '40%',
    paddingLeft: 10,
    margin: 10
  }, 

  outputText: {
    margin: 5
  }
});
