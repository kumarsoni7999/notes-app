import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState<any>('');

    const numbers = ['AC', '%', '<=', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '00', '0', '.', '=']

    const add = () => {
        setResult(parseFloat(num1) + parseFloat(num2));
    };

    const subtract = () => {
        setResult(parseFloat(num1) - parseFloat(num2));
    };

    const multiply = () => {
        setResult(parseFloat(num1) * parseFloat(num2));
    };

    const divide = () => {
        setResult(parseFloat(num1) / parseFloat(num2));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder=""
                keyboardType="numeric"
                value={num1}
                editable={false}
                onChangeText={text => setNum1(text)}
            />
            <FlatList
                data={numbers}
                numColumns={4}
                contentContainerStyle={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                renderItem={({ item, index }: any) => {
                    return (
                        <TouchableOpacity style={{
                            backgroundColor: 'black',
                            borderRadius: 50,
                            height: 50,
                            width: 50,
                            padding: 10,
                            margin: 5,
                        }} onPress={() => {
                            if((index + 1) == 3){
                            }
                            setNum1(curr => curr + item)
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 18,
                                textAlign: 'center',
                                verticalAlign: 'middle'
                            }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 30,
        width: '100%'
    },
    input: {
        marginBottom: 10,
        padding: 10,
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    result: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Calculator;
