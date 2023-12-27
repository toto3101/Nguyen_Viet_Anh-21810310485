import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Alert ,ImageBackground, Image, Text, TouchableOpacity,Dimensions,TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from 'react-native-vector-icons';
import { Feather } from 'react-native-vector-icons';
import { AntDesign } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const LoginScreen =({navigation})=>{

    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const handleForgotPassword = () =>{
        Alert.alert('Thông báo','Chưa có đủ trình độ thông cảm');
    }
    const handleRegister = () =>{
        navigation.navigate('Register');
    }
    const handleLogin = async ()=>{
        try{
            const response = await axios.get(
                `http://192.168.22.4:3000/api/users/?username=${username}&password=${password}`
            );
            if(username==="" || password===""){
                Alert.alert('Thông báo','Chưa nhập tài khoản hoặc mật khẩu')
            }else{
                if(response.data.length > 0){
                    await AsyncStorage.setItem('username', username);//Lưu tài khoản để đẩy dữ liệu tài khoản đang đăng nhập sang UserScreen
                    Alert.alert('Thông báo','Đăng nhập thành công',[
                        {
                            text:'OK',
                            onPress: ()=>{
                                navigation.navigate('Maintabs');
                            }
                        }
                    ]);
                }else{
                    Alert.alert('Thông báo','Đăng nhập thất bại');    
                }
            }
        }catch(error){
            if (error.response) {
            // Xử lý lỗi từ máy chủ (ví dụ: lỗi 404, 500, ...)
                console.error('Server error:', error.response.status);
                Alert.alert('Server Error', 'An error occurred on the server.');
            } else if (error.request) {
            // Xử lý lỗi mạng (ví dụ: không thể kết nối)
                console.error('Network error:', error.request);
                Alert.alert('Network Error', 'Unable to connect to the server.');
            } else {
            // Xử lý lỗi khác (ví dụ: lỗi cú pháp JSON)
                console.error('Error:', error.message);
                Alert.alert('Error', 'An error occurred.');
            }
        }
    }

    return(
        <ImageBackground source={require('../img/bg-5.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.caption}>ĐĂNG NHẬP</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.login}>
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Tài khoản</Text>
                            <TextInput
                                placeholder='Username'
                                style={styles.textinput}
                                onChangeText={(text)=>{
                                    setUsername(text);
                                }}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Mật khẩu</Text>
                            <View style={styles.showpass}>
                                <TextInput
                                    placeholder='Password'
                                    style={styles.textinputPass}
                                    secureTextEntry={!isPasswordVisible}
                                    onChangeText={(text)=>{
                                        setPassword(text);
                                    }}
                                />
                                <TouchableOpacity
                                    style={{paddingLeft:10 , paddingTop:10,}}
                                    onPress={() => setIsPasswordVisible((prev) => !prev)}
                                >
                                <Feather
                                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                                    color='#05375a'
                                    size={20}
                                />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={{paddingLeft:150}}>ForgotPassword ?</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={{width:'100%'}} 
                                onPress={handleLogin}
                            >
                                <LinearGradient  style={styles.butlogin} 
                                    colors={['#9efa4d', '#85d143', '#559120']}
                                >
                                    <Text>Login</Text>
                                </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Text style={{textAlign:'center', fontWeight:'bold',paddingBottom:20}}>or</Text>
                    <View style={styles.login_using}>
                        <TouchableOpacity style={styles.icon}>
                            <FontAwesome name='google' size={40} style={{ textAlign:'center' }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <FontAwesome name='facebook' size={40} style={{ textAlign:'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}> 
                            <FontAwesome name='twitter' size={40} style={{ textAlign:'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
    },
    image:{
        flex:1,
        justifyContent: 'center',
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'red'
    },
    body:{
        flex:3,
        backgroundColor:'rgba(250, 250, 250, 0.6)',
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        padding:30,
        paddingLeft:40,
    },
    caption:{
        fontSize:25,
        fontWeight:'bold'   
    },
    login:{
        paddingBottom:10,
        width:'90%'
    },
    input:{ 
        paddingBottom:10,
    },
    inputPass:{
        width:200
    },   
    textinput:{
        borderBottomWidth:1,
        height:40,
        paddingLeft:10
    },
    textinputPass:{
        borderBottomWidth:1,
        height:40,
        width:'100%',
        paddingLeft:10
    },
    showpass:{
        flexDirection:'row',
    },
    buttonGroup:{
        flexDirection: 'column',
        padding:20,
        paddingRight:40,
    },
    butlogin:{
        padding:10,
        height:40,
        width:'100%',
        alignItems:'center',
        borderRadius:20,
    },
    login_using:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    icon:{
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 10,
        width: '20%',
        elevation: 5, // Độ nâng của icon
    },
    Register:{
        flexDirection:'row',
        paddingBottom:20,
    },
})