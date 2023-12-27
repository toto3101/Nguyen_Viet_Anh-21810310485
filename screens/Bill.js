import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const BillScreen =({route})=>{
    const { cartItems, total } = route?.params || { cartItems: [], total: 0 };
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hóa đơn</Text>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                <View style={styles.item}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item })}>
                        <Image source={{ uri: item.image_url }} style={styles.menuItemImage} />
                    </TouchableOpacity>
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price} VNĐ</Text>
                    </View>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                </View>
                )}
                keyExtractor={(item) => item.product_id.toString()}
            />
            <Text style={styles.total}>Tổng tiền: {total} VNĐ</Text>
        </View>
    );
};

export default BillScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop:40,
        backgroundColor: '#e6f0ed',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    menuItemImage: {
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
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 15,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
  