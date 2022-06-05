import { useRef, useMemo ,useEffect,useState} from  'react';
import { View, Text, useWindowDimensions,ActivityIndicator, Dimensions} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import orders from '../../../assets/data/orders.json';
import styles from './styles';
import MapView,{Marker} from 'react-native-maps'
import * as Location from 'expo-location'
import {Entypo,MaterialIcons} from '@expo/vector-icons';
import MapViewDirections from "react-native-maps-directions"
const order = orders[0];


const OrderDelivery = () => {
    const [driverLocation,setDriverLocation]=useState(null);
    const bottomSheetRef = useRef(null);
    const { width, height } = useWindowDimensions();


    const snapPoints =useMemo(() => ["12%", "95%"], [] )

    useEffect(()=>{
        (async()=>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(!status==='granted'){
                console.log('Nonono')
                return;
            }
 
            let location=await Location.getCurrentPositionAsync();
            setDriverLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        })();
     },[])

     if(!driverLocation){
         return <ActivityIndicator size={"large"}/>
     }

    return (
        <GestureHandlerRootView style={styles.container} >
            <MapView style={{width,height}}
            showsUserLocation 
            followsUserLocation
            initialRegion={{
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta:0.07,
                longitudeDelta:0.07
            }}
            >
                <MapViewDirections
                    origin={driverLocation}
                    destination={{latitude: order.User.lat,longitude: order.User.lng}}
                    strokeWidth={10}
                    strokeColor="#3FC060"
                    apikey={"AIzaSyAE3qO-E0treLxV0lalFj6lgT33CS3QsIM"}
                />
                <Marker
                   coordinate={{
                       latitude:order.Restaurant.lat,
                       longitude:order.Restaurant.lng
                    }}
                    title={order.Restaurant.name}
                   description={order.Restaurant.address}
                >
                   <View 
                        style={{backgroundColor:'green',padding:5, borderRadius:20}}
                    >
                        <Entypo name='shop' size={30} color="black"/>
                   </View>
                </Marker>

                <Marker
                   coordinate={{
                       latitude:order.User.lat,
                       longitude:order.User.lng
                    }}
                   title={order.User.name}
                   description={order.User.address}
                >
                    <View 
                        style={{backgroundColor:'green',padding:5, borderRadius:20}}
                    >
                       <MaterialIcons name='restaurant' size={30} color="black"/>
                    </View>
                   
                </Marker>
            </MapView>
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