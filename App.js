import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Button, Alert, TextInput } from 'react-native';





export default function App() {
  

  
  const [inputValue, setInputValue] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = (_name) => {
    setModalVisible(!modalVisible);
  };
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

  const [currencyName, setCurrencyName] = useState("");
  const [currency, setCurrency] = useState("");
  

  


  // pobieranie info z API
  useEffect(() => {
    fetch('http://apilayer.net/api/live?access_key=5045099071835e8a9c3b4a49a43df72e&currencies=USD,EUR,GBP,CZK,HUF,TRY,BGN,DKK,RON,SEK,CHF&source=PLN', {
    method: 'GET',
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json; charset=utf-8',
    }
    })
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {

      const stringedData = JSON.stringify(data)
      const parsedData = JSON.parse(stringedData)

      setUSD(parsedData.quotes.PLNUSD)
      setEUR(parsedData.quotes.PLNEUR)
      setGBP(parsedData.quotes.PLNGBP)
      setCZK(parsedData.quotes.PLNCZK)
      setHUF(parsedData.quotes.PLNHUF)
      setTRY(parsedData.quotes.PLNTRY)
      setBGN(parsedData.quotes.PLNBGN)
      setDKK(parsedData.quotes.PLNDKK)
      setRON(parsedData.quotes.PLNRON)
      setSEK(parsedData.quotes.PLNSEK)
      setCHF(parsedData.quotes.PLNCHF)

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      Alert.alert('Error', 'Failed to fetch data.');
    });
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





  // przekazywanie informacji o walucie do modala
  function onOpenModal(currency_name, currency) {
    setCurrencyName(currency_name)
    setCurrency(currency)
    toggleModal()
  }

  



  return (
    <View style={styles.container}>
      <Text style={styles.outputText}>Podaj ilość PLN:</Text>
      <TextInput 
        placeholder='PLN'
        value={inputValue}
        onChangeText={(text) => onChanged(text)}
        style={styles.inputBox}
        maxLength={18}
      />
      <TouchableOpacity onPress={ () => onOpenModal("Dolar Amerykański", USD) }>
        <Text style={styles.outputText}>USD: { (inputValue * USD).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Euro", EUR) }>
        <Text style={styles.outputText}>EUR: { (inputValue * EUR).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Brytyjski funt", GBP) }>
        <Text style={styles.outputText}>GBP: { (inputValue * GBP).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Korona czeska", CZK) }>
        <Text style={styles.outputText}>CZK: { (inputValue * CZK).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Forint", HUF) }>
        <Text style={styles.outputText}>HUF: { (inputValue * HUF).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Lira turecka", TRY) }>
        <Text style={styles.outputText}>TRY: { (inputValue * TRY).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Lew Bułgarski", BGN) }>
        <Text style={styles.outputText}>BGN: { (inputValue * BGN).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Korona duńska", DKK) }>
        <Text style={styles.outputText}>DKK: { (inputValue * DKK).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Lej rumuński", RON) }>
        <Text style={styles.outputText}>RON: { (inputValue * RON).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Korona szwedzka", SEK) }>
        <Text style={styles.outputText}>SEK: { (inputValue * SEK).toFixed(5) }</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onOpenModal("Frank szwajcarski", CHF) }>
        <Text style={styles.outputText}>CHF: { (inputValue * CHF).toFixed(5) }</Text>
      </TouchableOpacity>
      
      
      

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.outputText}>Informacje o kursie: {currencyName}</Text>
            <Text style={styles.outputText}>Kurs wymiany: {currency}</Text>
            <Text style={styles.outputText}>Kwota przeliczona: { (inputValue * currency).toFixed(5) }</Text>
            <Button title="Zamknij" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    
    
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
    margin: 5,
    fontSize: 16,
  }
});
