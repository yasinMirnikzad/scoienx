import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Select } from 'native-base';


// ------- colors
import { seccondary, submit } from '../../../assets/colors';




const ExchangeBox = (props) => {

    const ItemClick = (value) => {
        props.setValue(value)
    }

    const _renderList = () => {
        return props.List.map(
            (item) => <Select.Item
                style={[props.item === item ? styles.activeSelectItem : {}]}
                key={item.id + ""}
                label={item.title} value={item} />
        )
    }


    return (
        <View style={[styles.exchangeBox, props.style]}>
            <Select
                height={50}
                borderColor={'transparent'}
                width={'35%'}
                accessibilityLabel={'props.item.title'}
                placeholder={props.item.title}
                selectedValue={props.item}
                onValueChange={(itemValue) => ItemClick(itemValue)}
            >
                {_renderList()}
            </Select>
        </View>
    );
}


export default ExchangeBox;




const styles = StyleSheet.create({
    exchangeBox: {
        width: '100%',
        height: 55,
        backgroundColor: seccondary,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    },
    changeBtn: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        backgroundColor: 'white',
        position: 'absolute',
        right: 40,
        top: '30%'
    },
    activeSelectItem: {
        backgroundColor: submit,
    }

});
