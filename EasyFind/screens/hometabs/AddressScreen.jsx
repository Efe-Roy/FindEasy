import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'twrnc';
import { getDatabase, ref, get } from "firebase/database";
import CardComp from '../../components/CardComp';

  
export default function AddressScreen() {
    const [dataSource, setDataSource] = useState([]);

    const [lat_c, setLat_c] = useState('');
    const [lng_c, setLng_c] = useState('');
    const [address_c, setAddress_c] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchProviders();
    }, []);
    
    const fetchProviders = async () => {
        const db = getDatabase();
        const providersRef = ref(db, 'providers');
    
        try {
            setLoading(true)
            const snapshot = await get(providersRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const providerList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setDataSource(providerList);
            } else {
                setDataSource([]);
            }
        } catch (error) {
            console.error("Error fetching providers:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
      <SafeAreaView style={tw`flex-1 bg-[#fafafa] pt-16 pb-24 px-6`}>
        <TouchableOpacity
            onPress={()=>navigation.goBack()} 
            style={tw`absolute right-8 top-14 z-10 bg-blue-500 p-1 rounded`}
        >
            <Text style={tw`text-white`}>Bo Back</Text>
        </TouchableOpacity>
        
        <Text style={tw`text-center font-bold text-xl`}>Search</Text>


        {/* Google search bar */}
        <View style={tw`p-5`}>
            <GooglePlacesAutocomplete 
                placeholder='Encuentra la dirección'
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18,
                        backgroundColor: "#e8e8e8",
                        borderRadius: 12
                    },
                }}
                onPress={(data, details = null) => {
                    setLat_c(details.geometry.location.lat);
                    setLng_c(details.geometry.location.lng);
                    setAddress_c(data.description);
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                    key: "AIzaSyBfnTMaraITkm6RdPtBPaxgK57tiqaKHGE",
                    language: "en",
                    components: "country:GB", 
                    location: "52.6369,-1.1398", 
                    radius: 15000,
                    strictbounds: true,
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
        </View>

        <ScrollView 
            showsVerticalScrollIndicator={false}
            // style={tw`bg-white pt-5 justify-center items-center`}
            contentContainerStyle={{
                paddingBottom: 50
            }}
        >
            {address_c && 
                <>
                    <View style={tw`flex-row justify-center items-center mb-5`}>
                        <TouchableOpacity onPress={() => setAddress_c('')} style={{ flexDirection: 'row', backgroundColor: 'red', padding: 8, borderRadius: 12 }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', marginRight: 8 }}>Clear Address</Text>
                        </TouchableOpacity>
                    </View>
                    {dataSource?.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => {
                                console.log("Navigating with:", item);
                                navigation.navigate("booking", {
                                    name: item?.name || "No Name",
                                    address: item?.address || "No Address",
                                    description: item?.description || "No Description"
                                });
                            }}
                        >
                            <CardComp item={item} clientAddress={address_c} />
                        </TouchableOpacity>
                    ))}
                </>
            }

        </ScrollView>

      </SafeAreaView>
    )
}