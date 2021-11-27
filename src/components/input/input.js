import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';


// ------- colors
import { primary, seccondary } from '../../../assets/colors';




const ExchangeBox = (props) => {

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput
                value={'props.value'}
                style={styles.input}
                {...props}
                keyboardType='numeric'
            />
        </View>
    );
}


export default ExchangeBox;




const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        marginTop: 50,
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: "500"
    },
    input: {
        height: 45,
        backgroundColor: seccondary,
        fontSize: 18,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginTop: 10,
        color: 'white'
    }
});
