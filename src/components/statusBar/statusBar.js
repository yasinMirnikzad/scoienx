import React from 'react';
import {
    StyleSheet, View, SafeAreaView,
    StatusBar
} from 'react-native';


const MyStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    )
}


export default MyStatusBar;


const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
});
