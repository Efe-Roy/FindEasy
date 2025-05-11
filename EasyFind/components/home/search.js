import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Search(props) {
    const {title, inputPlaceholder, navigation} = props;

    return <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity 
            style={styles.inputContainer}
            onPress={()=>navigation.navigate('AddressScreen')}
        >
            <Icon name="search" color="#1E90FF" size={20}/>
            <View style={styles.inputWrapper}>
                {/* <TextInput 
                    placeholder={inputPlaceholder}
                    style={styles.input} 
                /> */}
                <View style={styles.input}>
                    <Text>{inputPlaceholder}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#fff',
    },
    inputContainer: {
        height: 45,
        width: '90%',
        marginTop: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputWrapper: {
        width: '70%',
        marginLeft: 10,
    },
    input:{
        fontSize: 13,
        color: '#1E90FF',
    },
});