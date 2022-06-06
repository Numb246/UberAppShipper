import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth,DataStore } from 'aws-amplify';
import {Courier, TransportationModes} from '../../models';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {MaterialIcons, FontAwesome5} from "@expo/vector-icons";


export default function ProfileScreen() {
  const {dbCourier, sub, setDbCourier}= useAuthContext();

  const [name,setName] = useState(dbCourier?.name ||"");
  const [transportationMode, setTransportationMode] = useState(
    TransportationModes.DRIVING);


  const {} = useAuthContext(); 

  const navigation = useNavigation();

  const onSave = async () => {
    if (dbCourier){
      await updateCourier();
    } else{
      await createCourier();
    }    
    navigation.goBack();
  };

  const updateCourier = async () => {
    const courier =await DataStore.save(
      Courier.copyOf(dbCourier, (updated) =>{
        updated.name=name;
        updated.transportationMode= transportationMode;    
      })
    )
    setDbCourier(courier);
  };

  const createCourier= async() => {
    try{
      const courier = await DataStore.save(
        new Courier({
          name, 
          sub,
          transportationMode,
      })
    );
    setDbCourier(courier);
    } catch(e){
      Alert.alert("Error",e.message)
    }
  }


  return (
    <SafeAreaView>
      <Text style = {styles.title}>Profile</Text>
      <View style={styles.inputContainer}>
        <TextInput
        value={name}
        style={styles.input}
        placeholder='Name'
        onChangeText={setName}
        />

        <View style={{flexDirection: "row"}}>
          <Pressable 
            onPress={()=> setTransportationMode(TransportationModes.BICYCLING)}
            style={{
              backgroundColor: transportationMode === TransportationModes.BICYCLING?
              '#3FC606'
              : "white", 
              margin:10, 
              padding:10,
              borderWidth:1,
              borderColor:"gray",
              borderRadius:10, }}>
            <MaterialIcons name ="pedal-bike" size={40} color="black"/>
          </Pressable>
          <Pressable 
            onPress={()=> setTransportationMode(TransportationModes.DRIVING)}
            style={{
              backgroundColor: transportationMode === TransportationModes.DRIVING?
              '#3FC606'
              : "white", 
              margin:10, 
              padding:10,
              borderWidth:1,
              borderColor:"gray",
              borderRadius:10, }}>
            <FontAwesome5 name ="car" size={40} color="black"/>
          </Pressable>
        </View>

      </View>
      <Button 
      onPress={onSave} title='Save'/>
      <Text 
      style = {{color: 'red', textAlign:'center', margin: 10}}
      onPress = {() => Auth.signOut()}
      >
          SIGN OUT
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        fontWeight:'bold',
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
    },
    input: {
      margin:10,
      backgroundColor: 'white',
      padding:15,
      borderRadius:5,
    },

})