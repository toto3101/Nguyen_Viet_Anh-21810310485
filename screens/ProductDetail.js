import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from 'react-native-vector-icons';
import { useCart } from './CartContext';

const ProductDetail =({route})=>{
    const { item } = route.params;
    const { cartItems, dispatch } = useCart() || { cartItems: [], dispatch: () => {} };

    const handleAddToCart = (item) => {
        // Check if the item is already in the cart
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
        // If the item is in the cart, increment its quantity
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });

        dispatch({ type: 'update_to_room', updatedCart });
        } else {
        // If the item is not in the cart, add it to the cart
        dispatch({ type: 'add_to_room', item: { ...item, quantity: 1 } });
        }
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image_url }} style={styles.menuItemImage} />
                </View>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>Giá: {item.price} VNĐ</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => handleAddToCart(item)}>
                    <Ionicons name="cart-outline" style={styles.buttonIcon} />
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    menuItemImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    menuItemName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
        textAlign: 'center',
    },
    menuItemDescription: {
        fontSize: 18,
        color: '#666',
        marginVertical: 10,
        textAlign: 'left',
    },
    menuItemPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E91E63',
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    buttonIcon: {
        fontSize: 36,
        paddingHorizontal: 20,
    },
});
