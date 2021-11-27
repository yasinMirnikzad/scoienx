import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet, Text,
    TouchableOpacity,
    Modal, View
} from 'react-native';
import axios from 'axios';
import { Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'


// ------- colors
import { primary, submit } from '../assets/colors';

// ------- components
import { ExchangeBox, Input, ModalWallet } from './components';

// ------- token
import { token } from './config/api-token';

// ------- List
import { WalletsList } from './utilities/strings';


const URL = 'http://api.exchangeratesapi.io/v1/latest';



export default function App() {
    const [Rates, changeRates] = useState();
    const [Origin, SetOrigin] = useState(WalletsList[0]);
    const [Destination, SetDestination] = useState(WalletsList[1]);
    const [wallet, SetWallet] = useState();
    const [Amount, changeAmount] = useState('0');
    const [Btnloading, changeBtnLoading] = useState(false);
    const [open, setOpen] = useState(false)


    // ---------- onChange for input
    const onChange = (val) => {
        if (parseFloat(val) > wallet[Origin.title]) {
            changeAmount(String(wallet[Origin.title]))
        } else {
            changeAmount(val)
        }
    }

    // ---------- function to toggle
    const Toggle = async () => {
        let Buffer = Origin;
        await SetOrigin(Destination);
        await SetDestination(Buffer);
    }

    // ---------- function to toggle
    const GetRates = async () => {

        await axios({
            method: 'GET',
            url: URL,
            params: {
                access_key: token,
                symbols: 'USD,EUR,GBP',
            }
        }).then((res) => {
            changeRates(res.data.rates);
        }).catch((err) => {
            // console.log('err', err.response)
        });
    }

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
        } catch (err) {
            // console.log('err', err)
            // error reading value
        }
    }

    // ---------- Transfer 
    const Transfer = async () => {
        if (Amount != 0) {
            await changeBtnLoading(true);

            // ------ proccess
            let walletBuffer = { ...wallet };
            walletBuffer[Origin.title] = wallet[Origin.title] - parseFloat(Amount);
            walletBuffer[Destination.title] = parseFloat(wallet[Destination.title]) + ((parseFloat(Amount) * parseFloat(Rates[Destination.title])) / parseFloat(Rates[Origin.title]));
            // ------ save data
            try {
                await SetWallet(walletBuffer);
                await changeAmount('0');
                await AsyncStorage.setItem('wallet', JSON.stringify(walletBuffer));
                await changeBtnLoading(false);

                Toast.show({
                    type: 'success',
                    text1: 'Successfully transferred.',
                    position: 'top',
                    visibilityTime: 3000
                });
            } catch (e) {
                // ------ if error occurred on save data
                Toast.show({
                    type: 'error',
                    text1: 'error occurred.',
                    position: 'top',
                    visibilityTime: 3000
                });
            }

        } else {
            // ------ if dont have value in amount
            Toast.show({
                type: 'error',
                text1: 'First enter amount.',
                position: 'top',
                visibilityTime: 3000
            });
        }
    }

    // ---------- useEffect
    useEffect(() => {

        // ------ get wallet data
        RetriveWallet();

        // ------ get rates
        setInterval(() => {
            GetRates();
        }, 3000);

    }, []);



    return (
        <View style={styles.container}>

            <Text style={styles.title}>Transfer:</Text>
            <View style={{ width: '90%', alignItems: 'center' }}>

                <ExchangeBox
                    item={Origin}
                    List={WalletsList.filter((item) => item.id !== Destination.id)}
                    style={{ borderBottomWidth: 1 }}
                    setValue={SetOrigin}
                />

                <ExchangeBox
                    item={Destination}
                    List={WalletsList.filter((item) => item.id !==
                        Origin.id)}
                    setValue={SetDestination}
                />

                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={Toggle}
                    style={styles.changeBtn}>
                    <Ionicons name="repeat" size={25} color={primary}
                        style={{
                            transform: [{ rotate: '90deg' }]
                        }}
                    />
                </TouchableOpacity>


            </View>

            {Rates &&
                <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{Origin.icon + Rates[Origin.title]}</Text>
                    <Text style={styles.valueText}> ≈ </Text>
                    <Text style={styles.valueText}>{Destination.icon + Rates[Destination.title]}</Text>
                </View>
            }

            <Input
                value={Amount}
                title='Amount'
                onChangeText={(val) => onChange(val)}
            />

            {wallet &&
                <Text style={styles.inventory}
                >{'Inventory: ' + Origin.icon + wallet[Origin.title]}</Text>
            }

            <Button
                isLoading={Btnloading}
                onPress={Transfer}
                style={styles.submitBtn}>
                Transfer
            </Button>

            <Button
                onPress={() => setOpen(true)}
                style={styles.showWalletBtn}
            >
                Show Wallet
            </Button>



            {/* ------ modal of wallet */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={open}
            >
                <ModalWallet
                    close={() => setOpen(false)}
                />

            </Modal>


        </View >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
        paddingTop: 30
    },
    title: {
        width: '90%',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    changeBtn: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        backgroundColor: 'white',
        position: 'absolute',
        right: 30,
        top: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    valueContainer: {
        width: '90%',
        marginTop: 10,
        flexDirection: 'row'
    },
    valueText: {
        color: '#FAFAFA',
        fontSize: 12
    },
    inventory: {
        width: '90%',
        marginTop: 10,
        color: 'white',
        fontSize: 12
    },
    submitBtn: {
        width: '90%',
        marginTop: 20,
        backgroundColor: submit,
        height: 45
    },
    showWalletBtn: {
        borderWidth: 1,
        borderColor: '#EAEAEA',
        backgroundColor: 'transparent',
        width: '90%',
        marginTop: 10,
        height: 45
    },
    bottomModal: {
        marginBottom: 0,
        marginTop: "auto",
    }
});


