import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, FlatList,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from './CartContext';
import {Ionicons} from 'react-native-vector-icons';

const CartScreen =({navigation})=>{
    const { cartItems, dispatch } = useCart();
    const handleRemoveFromCart = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', itemId });
    };

    const handleIncreaseQuantity = (itemId) => {
        const updatedCart = cartItems.map((item) => {
            if (item.product_id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
            }
            return item;
    });

    dispatch({ type: 'UPDATE_CART', updatedCart });
    };
    
    const handleDecreaseQuantity = (itemId) => {
        const updatedCart = cartItems.map((item) => {
            if (item.product_id === itemId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
    
    dispatch({ type: 'UPDATE_CART', updatedCart });
    };

    const handPayment = () =>{
        const total = calculateTotalPrice();
        Alert.alert('Thông báo',`Thanh toán thành công. Tổng tiền: ${total} VNĐ`,[{Text: 'OK'}])
        navigation.navigate('BillScreen', {
            cartItems: cartItems,
            total: total,
        });
        dispatch({type: 'CLEAR'});
    }

    const calculateTotalPrice = () => {
        let total = 0;
        for (const item of cartItems) {
            total += item.price * item.quantity;
        }
    return total;
    };

    const renderMenuItem = ({ item }) => {
        return (
            <View style={styles.cartItem}>
            <Image source={{ uri: item.image_url }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} VNĐ</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.remove} onPress={() => handleDecreaseQuantity(item.product_id)}>
                <Ionicons name="remove" size={25} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.add} onPress={() => handleIncreaseQuantity(item.product_id)}>
                <Ionicons name="add" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{padding:10}} onPress={() => handleRemoveFromCart(item.product_id)}>
                <Ionicons name="trash-bin" size={25} color="red" />
            </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {/* <Text style={styles.cartTitle}>Giỏ hàng</Text> */}
            <FlatList
                data={cartItems}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.product_id}
            />
            <Text style={styles.totalPrice}>Tổng giá trị: {calculateTotalPrice()} VNĐ</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handPayment}>
                <Text style={styles.checkoutButtonText}>Thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CartScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 60,
        backgroundColor: '#e6f0ed',
    },
    cartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding:10,
        borderRadius:10,
        backgroundColor:'white',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#4CAF50',
    },
    itemPrice: {
        fontSize: 14,
        color: '#E91E63',
        fontWeight: 'bold',
    },
    quantityContainer: {
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    remove:{
        borderRightWidth:1,
    },
    add:{
        borderLeftWidth:1,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 15,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    checkoutButton: {
        backgroundColor: '#85d143',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: 'white',
    },
});