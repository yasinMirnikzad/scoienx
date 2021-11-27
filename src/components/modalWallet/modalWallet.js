import React, { useEffect, useState } from 'react';
import {
    Text, StyleSheet, View
} from 'react-native';
import { Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ------- colors
import { error, primary, seccondary } from '../../../assets/colors';

// ------- List
import { WalletsList } from '../../utilities/strings';

// ------- List
import StatusBar from '../statusBar';




const ModalWallet = (props) => {
    const [wallet, SetWallet] = useState();

    // ---------- function to retrieve wallet
    const RetriveWallet = async () => {
        try {
            const value = await AsyncStorage.getItem('wallet');

            if (value !== null) {
                SetWallet(JSON.parse(value));
            } else {
                SetWallet({
                    'USD': 200,
                    'EUR': 150,
                    'GBP': 100
                });
            }
        } catch (e) {
            console.log('err', err)
            // error reading value
        }
    }

    // ---------- useEffect
    useEffect(() => {
        RetriveWallet();
    }, []);



    return (

        <View
            style={styles.container}
        >


            <StatusBar
                backgroundColor={primary}
                barStyle="light-content"
            />
            <Text style={styles.title}>Wallet</Text>

            {wallet && WalletsList.map((item, index) =>
                <RowWallet
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    value={wallet[item.title]}
                />
            )}




            <Button
                style={styles.closetBtn}
                onPress={props.close}
            >
                Close
            </Button>
        </View>
    );
}



export default ModalWallet;



const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: primary,
        paddingHorizontal: 25,
        paddingTop: 30
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 15
    },
    closetBtn: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: error,
        borderRadius: 4,
        marginTop: 20
    },
    closetBtnText: {
        color: 'white'
    },
    rowWallet: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: seccondary,
        paddingHorizontal: 14,
        borderRadius: 4
    },
    rowWalletTitle: {
        color: 'white',
        fontWeight: '600'
    },
    rowWalletValue: {
        color: 'white',
        fontWeight: '500'
    }


});



const RowWallet = (props) => {

    return (
        <View style={styles.rowWallet}>
            <Text style={styles.rowWalletTitle}>{props.title}</Text>
            <Text style={styles.rowWalletValue}>{props.icon + ' ' + props.value}</Text>
        </View>
    )
}