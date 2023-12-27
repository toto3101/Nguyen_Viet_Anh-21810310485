import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from 'react-native-vector-icons';
import { Feather } from 'react-native-vector-icons';
const SplashScreen =({navigation})=>{
    const handleLogin = () =>{
        navigation.navigate('Login');
    }
    const handleRegister = () =>{
        navigation.navigate('Register');
    }
    return(
        <ImageBackground source={require('../img/bg-5.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../img/logo_4.jpg')} style={styles.logo}/>
                </View>
                <View style={styles.body}>
                    <TouchableOpacity onPress={handleRegister} style={styles.arrow}>
                        <Feather name="arrow-left" size={40} style={{ color: 'white' }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogin} style={styles.arrow}>
                        <Feather name="arrow-right" size={40} style={{ color: 'white' }}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        flex:1,
        justifyContent: 'center',
    },
    header:{
        flex:7,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width: height_logo,
        height: height_logo,
        borderRadius: height_logo / 2,
    },
    body:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:20,
        paddingLeft:20,
        paddingTop:40,
    },
    arrow:{
        borderRadius:50,
        // borderWidth:1,
        width:'12%',
        height:41,
        backgroundColor:'#40de49'

    }
})