import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { FontAwesome } from 'react-native-vector-icons';
import { AntDesign } from 'react-native-vector-icons';

import HomeScreen from './Home';
import UserScreen from './Users';
import ProductScreen from './Products';
import CartScreen from './Cart';
import BillScreen from './Bill';

const Tabs = createBottomTabNavigator();

const MainTabs =()=>(
    <Tabs.Navigator
        initialRouteName="Home"
        shifting={false}
        activeColor="#0d0d0d"
        barStyle={{ backgroundColor: '#fff' }}
        screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                display: 'flex',
                padding: 1,
                fontSize: 14, // Thay đổi cỡ chữ ở đây
            },
            tabBarActiveTintColor: '#00f', // Thay đổi màu của tab được chọn ở đây
            tabBarStyle: {
                // position:'absolute',
                backgroundColor: '#fff', // Màu nền của thanh tab
                // width: '95%',
                height:60, // Điều chỉnh độ rộng của thanh tab
                // borderRadius:10,
                // bottom:15,
                // padding:10,
                // left:10,
                // transform: [{ scale: 1.0 }],
            },
        }}
    >
    <Tabs.Screen 
        name='Home'
        component={HomeScreen}
        options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={26} />,  
        }}
    />
    <Tabs.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
            tabBarLabel: 'Sản phẩm',
            tabBarIcon: ({ color }) => <Ionicons name="shirt-outline" color={color} size={26} />,  // Corrected icon name
        }}
    />
    <Tabs.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
            tabBarLabel: 'Giỏ hàng',
            tabBarIcon: ({ color }) => <Ionicons name="cart-outline" color={color} size={26} />,  // Corrected icon name
        }}
    />

    <Tabs.Screen
        name="BillScreen"
        component={BillScreen}
        options={{
            tabBarLabel: 'Hóa đơn',
            tabBarIcon: ({ color }) => <AntDesign name="file1" color={color} size={26} />,  // Corrected icon name
        }}
    />
    
    <Tabs.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color }) => <FontAwesome name="user-o" color={color} size={26} />,  // Corrected icon name
        }}
    />
</Tabs.Navigator>
)

export default MainTabs;