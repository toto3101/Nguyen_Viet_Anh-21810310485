import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, ScrollView, TextInput,Dimensions, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from 'react-native-vector-icons';
import { Feather } from 'react-native-vector-icons';
import { AntDesign } from 'react-native-vector-icons';
import { Ionicons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCart } from './CartContext';

const HomeScreen = ({navigation}) =>{
    const [username, setUsername] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [displayedMenuItems, setDisplayedMenuItems] = useState([]);
    const { cartItems, dispatch } = useCart() || { cartItems: [], dispatch: () => {} };

    const getUsername = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        } catch (error) {
            console.error('Lỗi khi lấy tên tài khoản:', error);
        }
    };

    const handleBack =()=>{
        navigation.goBack();
    }
    const handlelogout=()=>{
        navigation.navigate('Login');
    }
    useEffect(() => {
        getUsername();
    }, []);

    useEffect(() => {
        axios.get(`http://192.168.22.4:3000/api/products`)
            .then((response) => {
                setMenuItems(response.data);
                setDisplayedMenuItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const handleSearch = () => {
        const filteredMenuItems = menuItems.filter(item =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setDisplayedMenuItems(filteredMenuItems);
    };
    const handleAddToCart = (item) => {
        // Check if the item is already in the cart
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === item.product_id);
    
        if (existingItem) {
            // If the item is in the cart, increment its quantity
            const updatedCart = cartItems.map((cartItem) => {
                if (cartItem.product_id === item.product_id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
    
            dispatch({ type: 'UPDATE_CART', updatedCart });
        } else {
            // If the item is not in the cart, add it to the cart
            dispatch({ type: 'ADD_TO_CART', item: { ...item, quantity: 1 } });
            Alert.alert('Thông báo', `Đã thêm thành công sản phẩm: ${item.name}`);
            console.log('Dịch vụ đã thêm: ', cartItems);
        }
    };
    const handleShowAll = () => {
        setDisplayedMenuItems(menuItems);
    };
    const renderMenuItem = ({ item }) => {
        return (
            <View style={styles.menuItemContainer}>
                <View style={styles.menuItem}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item })}>
                            <Image source={{ uri: item.image_url }} style={styles.menuItemImage} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuItemDetails}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemPrice}>Đơn giá: {item.price} VNĐ</Text>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity 
                            onPress={() => handleAddToCart(item)} style={{width:'100%',color:'white'}} >
                            <LinearGradient  style={styles.btnlogin} 
                                colors={['#9efa4d', '#85d143', '#559120']}
                            >
                                <Text style={{ color:'white' }}>Thêm sản phẩm</Text>
                            </LinearGradient>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        );
    };

    return(
        <View style={styles.container}>
            <View style={styles.tab_bar}>
                <View style={{paddingLeft:10,paddingTop:10}}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name='arrow-back' size={35} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.logo}>
                    <Image source={require('../img/logo_4.jpg')} style={styles.logoip}/>
                </View>
                <View style={{ paddingRight:10, }}>
                    <TouchableOpacity onPress={handlelogout}>
                        <AntDesign name='logout' size={35} style={styles.logout}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.hello}>
                <Text style={{fontSize:18, padding:10}}>Hello {username}</Text>
            </View>
            <View style={styles.Search}>
                <View style={styles.inputSearch}>
                    <TextInput
                        style={styles.input} 
                        placeholder='Enter keywords'
                        value={searchKeyword}
                        onChangeText={(text) => setSearchKeyword(text)}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <FontAwesome name='search' size={25} style={{ paddingTop:5, }}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.header}>
                <View style={styles.product1}>
                    <TouchableOpacity>
                        <Image source={require('../img/T-shirt.jpg')} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../img/Shoes.jpg')} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../img/Dress.jpg')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.product1}>
                    <TouchableOpacity>
                        <Image source={require('../img/pants.jpg')} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../img/socks.jpg')} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShowAll}>
                        <Image source={require('../img/all.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
            <FlatList
                data={displayedMenuItems}
                renderItem={renderMenuItem}
                keyExtractor={(item, index) => `${item.product_id}`}
                //numColumns={numColumns}
            />
            </View>
        </View>    
    );
}

export default HomeScreen;


const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        backgroundColor:'#e6f0ed',
    },
    tab_bar:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        backgroundColor:'white',
    },
    logo:{
        flex: 1, // Để hình ảnh có thể mở rộng và ở giữa
        paddingLeft:10,
    },
    logoip:{
        width:'100%',
        height:40,
    },
    Search:{
        flex:1,
        padding:10,
    },
    inputSearch:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        padding:5,
        borderRadius:10,
    },
    input:{
        //borderWidth:1,
        width:300,
        height:40
    },
    header:{
        flex:2,
        padding:10
    },
    product1:{
        flexDirection: 'row',  
        justifyContent: 'space-between',
        alignItems: 'center',  
        paddingBottom:20,
    },
    icon:{
        width: 50,
        height: 50,
        borderRadius: height_logo / 2,
    },
    body:{
        flex:5,
        //backgroundColor:'green',
        margin:10
    },
    menuItemContainer:{
        //borderWidth:1,
        padding:10,
        marginBottom:10,
        width:'100%',
        borderRadius:10,
        backgroundColor:'white',
    },
    imageContainer: {
        //borderWidth:1,
        width: '100%',
        marginRight: 16,
        paddingBottom:5,
    },
    menuItemImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    }, 
    menuItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuItemPrice: {
        fontSize:15,
        paddingTop:10,
        fontSize: 16,
        //color: '#777', // Price text color
    },
    buttonGroup:{
        paddingTop:10
    },
    btnlogin:{
        padding:10,
        height:35,
        alignItems:'center',
        borderRadius:10,
    },
})