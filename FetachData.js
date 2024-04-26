import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';





const FetchData = () => {

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



    return (
        <View>

            <Text>PLN to:</Text>

            <Text>USD: {USD}</Text>
            <Text>EUR: {EUR}</Text>
            <Text>GBP: {GBP}</Text>
            <Text>CZK: {CZK}</Text>
            <Text>HUF: {HUF}</Text>
            <Text>TRY: {TRY}</Text>
            <Text>BGN: {BGN}</Text>
            <Text>DKK: {DKK}</Text>
            <Text>RON: {RON}</Text>
            <Text>SEK: {SEK}</Text>
            <Text>CHF: {CHF}</Text>

        </View>
    );



};





export default FetchData;
