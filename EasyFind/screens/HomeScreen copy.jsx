//HomeScreen
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { getDatabase, ref, get } from "firebase/database";
import { signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from "../config";

import Search from '../components/home/search';
import CardComp from '../components/CardComp';

export default function HomeScreen({navigation}) {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProviders();
      }, []);
    
    const fetchProviders = async () => {
        const db = getDatabase();
        const providersRef = ref(db, 'providers');
    
        try {
          const snapshot = await get(providersRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            // Convert object to array
            const providerList = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            setProviders(providerList);
          } else {
            setProviders([]);
          }
        } catch (error) {
          console.error("Error fetching providers:", error);
        } finally {
          setLoading(false);
        }
    };
    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigation.replace("login"); // Redirect to Login screen
        } catch (error) {
          console.error("Logout Error:", error);
        }
    };

    return (
        <SafeAreaView>
            <View style={tw`h-1/2`}>
                <View style={tw`flex-1`}>
                    <Image
                        source={require('../assets/home/header-bg.png')}
                        resizeMode="cover"
                        style={tw`w-full h-full`}
                    />
                    <View style={tw`bg-black/50 absolute w-full h-full flex-1`}/>
                </View>
                <View style={tw`absolute inset-0 w-full h-full z-10`}>
                   
                    <View style={tw`flex-row ml-6 mt-16`}>
                        <TouchableOpacity 
                            style={tw` bg-red-500 flex-row p-3 rounded-2xl`}
                            onPress={()=>handleLogout()}
                        >
                            <Text style={tw`text-white font-bold mr-2`}>LogOut</Text>
                            <Icon name="logout" color="#edecec" size={22}/>
                        </TouchableOpacity>
                    </View>
                    <Search
                        title="Search for local services"
                        inputPlaceholder="Search the cleaning, plumber etc ..."
                        navigation={navigation}
                    />
                </View>
            </View>
            <View style={tw`z-20 pt-7 h-[62.5%] -mt-24 bg-gray-100 rounded-t-[50px]`}>
                {loading?
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View> 
                    :
                    <ScrollView horizontal
                        contentContainerStyle={{ paddingHorizontal: 24 }}
                    >
                        {providers?.map((item, index) => {
                            return(
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("booking", item)}>
                                    <CardComp item={item} clientAddress='' />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    )
}