import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Alert ,ImageBackground, Image, Text, TouchableOpacity,Dimensions,TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from 'react-native-vector-icons';
import { Feather } from 'react-native-vector-icons';
import { AntDesign } from 'react-native-vector-icons';
import axios from 'axios';

const RegisterScreen = ({navigation}) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setfull_name] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [re_Pass, setRe_pass] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleRegister = async () => {
        if (username === "" || password === "" || full_name === "" || re_Pass === "" || phonenumber === "" ) {
            Alert.alert('Thông báo', 'Chưa nhập đủ thông tin');
        } else if (re_Pass !== password) {
            Alert.alert('Thông báo', 'Mật khẩu phải trùng nhau');
        } else {
            try {
                const response = await axios.post('http://192.168.22.4:3000/api/users', {
                    username,
                    password,
                    full_name,
                    phonenumber,
                    email,
                });
                
                if (response.data) {
                    Alert.alert('Thông báo', 'Đăng kí thành công', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('Login');
                            },
                        },
                    ]);
                } else {
                    Alert.alert('Thông báo', 'Đăng kí thất bại');
                }
            } catch (error) {
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
    }

    return(
        <ImageBackground source={require('../img/bg-5.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.caption}>ĐĂNG KÍ</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.login}>
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Nhập email:</Text>
                            <TextInput
                                placeholder='Email'
                                style={styles.textinput}
                                onChangeText={(text)=>{
                                    setEmail(text);
                                }}
                                autoCapitalize="none"
                                
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Nhập đầy đủ họ tên:</Text>
                            <TextInput
                                placeholder='Fullname'
                                style={styles.textinput}
                                onChangeText={(text)=>{
                                    setfull_name(text);
                                }}
                                autoCapitalize="none"
                                
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Nhập tài khoản</Text>
                            <TextInput
                                placeholder='Username'
                                value={username}
                                style={styles.textinput}
                                onChangeText={(text)=>{
                                    setUsername(text);
                                }}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Nhập số điện thoại:</Text>
                            <TextInput
                                placeholder='Phone'
                                value={phonenumber}
                                style={styles.textinput}
                                onChangeText={(text)=>{
                                    setPhonenumber(text);
                                }}
                                autoCapitalize="none"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Nhập mật khẩu</Text>
                            <View style={styles.showpass}>
                                <TextInput
                                    placeholder='Password'
                                    value={password}
                                    style={styles.textinputPass}
                                    secureTextEntry={!isPasswordVisible}
                                    onChangeText={(text)=>{
                                        setPassword(text);
                                    }}
                                    autoCapitalize="none"
                                    
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
                        <View style={styles.input}>
                            <Text style={{ paddingBottom:10}}>Nhập lại mật khẩu:</Text>
                            <TextInput
                                placeholder='Re-pass'
                                style={styles.textinput}
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={(text)=>{
                                    setRe_pass(text);
                                }}
                                autoCapitalize="none"
                                
                            />
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={{width:'100%'}} 
                                onPress={handleRegister}
                            >
                                <LinearGradient  style={styles.butlogin} 
                                    colors={['#9efa4d', '#85d143', '#559120']}
                                >
                                    <Text>Register</Text>
                                </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </ImageBackground>
    );
}

export default RegisterScreen;

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
        flex:4,
        backgroundColor:'rgba(250, 250, 250, 0.7)',
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        padding:30,
        paddingLeft:40,
    },
    caption:{
        fontSize:25,
        fontWeight:'bold'      
    },
    text:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center'
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