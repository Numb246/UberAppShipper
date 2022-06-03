import { useRef, useMemo } from  'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import orders from '../../../assets/data/orders.json';
import styles from './styles';

const order = orders[0];


const OrderDelivery = () => {
    const bottomSheetRef = useRef(null);

    const snapPoints =useMemo(() => ["12%", "95%"], [] )

    return (
        <GestureHandlerRootView style={styles.container} >
            <BottomSheet 
                ref={bottomSheetRef} 
                snapPoints={snapPoints} 
                handleIndicatorStyle={styles.handleIndicator}
            >
                <View style={styles.handleIndicatorContainer}>
                    <Text style={styles.routeDetailsText}>14 min</Text>
                    <FontAwesome5
                        name="shopping-bag"
                        size={30}
                        color="#3FC060"  
                        style={{marginHorizontal: 10}}
                    />
                    <Text style={styles.routeDetailsText}> 5 km</Text>
                </View>
                <View style={styles.deliveryDetailsContainer}>
                    <Text style={styles.restaurantName}>{order.Restaurant.name}</Text>

                    <View style={styles.adressContainer}>
                        <Fontisto name="shopping-store" size={22} color="grey" />
                        <Text style={styles.adressText} 
                        >
                            {order.Restaurant.address}
                        </Text>
                    </View>

                    <View style={styles.adressContainer}>
                        <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
                        <Text 
                            style={styles.adressText}
                        >
                            {order.User.address}
                        </Text>
                    </View>
                    <View style ={styles.orderDetailsContainer}>
                        <Text style={styles.orderItemText}> Onion Rings x1</Text>
                        <Text style={styles.orderItemText}> Big Mac x3</Text>
                        <Text style={styles.orderItemText}> Big Tasty x2</Text>
                        <Text style={styles.orderItemText}> Coca-Cola x1</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Accept Order</Text>
                </View>
            </BottomSheet>
        </GestureHandlerRootView>
    )
};

export default OrderDelivery;