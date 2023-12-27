import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity,FlatList,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from './CartContext';
import { Picker } from '@react-native-picker/picker';

import axios from 'axios';

const ProductScreen =({navigation})=>{
    const [menuItems, setMenuItems] = useState([]);
    const [numColumns, setNumColumns] = useState(2);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Thêm state cho loại quần áo được chọn
    const { cartItems, dispatch } = useCart() || { cartItems: [], dispatch: () => {} };

    const toggleColumns = () => {
        setNumColumns(numColumns === 2 ? 1 : 2); // Đổi số cột giữa 1 và 2
    };

    useEffect(() => {
        axios.get(`http://192.168.22.4:3000/api/categories`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://192.168.22.4:3000/api/products`)
            .then((response) => {
                setMenuItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    const filterMenuItemsByCategory = () => {
        if (selectedCategory === 'All') {
            return menuItems;
        } else {
            return menuItems.filter(item => item.category_id === selectedCategory);
        }
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

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="All" value="All" />
                    {categories.map(category => (
                        <Picker.Item key={category.category_id} label={category.name} value={category.category_id} />
                    ))}
                </Picker>
            </View>
            <FlatList
                data={filterMenuItemsByCategory()}
                renderItem={renderMenuItem}
                keyExtractor={(item, index) => `${item.product_id}-${numColumns}`}
                numColumns={numColumns}
            />

        </View>
    );
}

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor:'#e6f0ed',
        paddingBottom:10,
    },
    menuItemContainer: {
        marginLeft:14,
        marginBottom: 16,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    menuItemContainer: {
        marginLeft:14,
        marginBottom: 16,
    },
    menuItem:{
        // borderWidth: 1,
        padding: 10,
        width: 160,
        height:350,
        borderRadius: 10,
        backgroundColor:'#ffffff',
    },
    imageContainer: {
        width: '100%',
        marginRight: 16,
    },
    menuItemImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    menuItemDetails:{
        paddingTop:10,
        //  borderWidth:1,
        height:130
    },
    menuItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuItemPrice: {
        paddingTop:5,
        fontSize: 16,
        color: '#777', // Price text color
    },
    NameandPrice:{
        flexDirection:'column'
    },
    buttonGroup: {
        flexDirection: 'row',
        marginTop: 8,
    },
    buttonIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    btnlogin:{
        padding:10,
        height:40,
        alignItems:'center',
        borderRadius:20,
    },
    filterContainer:{
        
    },
    picker: {
        height: 50,
        width: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
    },
});
