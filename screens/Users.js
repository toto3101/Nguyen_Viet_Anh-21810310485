import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserScreen = ({ navigation }) => {
    const [userData, setUserData] = useState([]);

    const getUsername = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
                axios.get(`http://192.168.22.4:3000/api/users/?username=${storedUsername}`)
                    .then(response => {
                        // Lấy dữ liệu từ JSON Server
                        const user = response.data[0]; // Giả sử có một người dùng duy nhất
                        // Loại bỏ trường 'id' khỏi thông tin tài khoản
                        const {user_id,id,createdAt,updatedAt,password, ...userInfo } = user;
                        setUserData(userInfo);
                    })
                    .catch(error => {
                        console.error('Lỗi khi gọi JSON Server:', error);
                    });
            }
        } catch (error) {
            console.error('Lỗi khi lấy tên tài khoản:', error);
        }
    };

    useEffect(() => {
        getUsername();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.menuTitle}>Thông tin tài khoản</Text>
            {Object.keys(userData).map(key => (
                <View key={key} style={styles.userInfoContainer}>
                    <Text style={styles.userInfoLabel}>{key}:</Text>
                    <Text style={styles.userInfoText}>{userData[key]}</Text>
                </View>
            ))}
        </View>
    );
};

// Rest of your code

export default UserScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#e6f0ed',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign:'center'
    },
    userInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    userInfoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userInfoText: {
        fontSize: 16,
    },
});

