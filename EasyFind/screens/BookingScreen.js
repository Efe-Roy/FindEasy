import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from 'twrnc';

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params || {};

  return (
    <SafeAreaView style={tw`flex-1`}> 
        <TouchableOpacity 
            onPress={()=>navigation.goBack()} 
            style={tw`absolute z-10 rounded-full p-2 shadow top-10 left-6 bg-slate-200`}>
            <Text>Go Back</Text>
        </TouchableOpacity>

        <View style={tw`flex-1 justify-center items-center px-6`}>
          <View style={tw`mb-2`}>
            <Text style={tw`text-[33px] leading-[33px] font-bold`}>
              {params?.name || 'Unknown Title'}
            </Text>
          </View>

          <Text style={tw`text-[17px] font-bold font-sans`}>
            {params?.address || 'Unknown Location'}
          </Text>

          <View style={tw`justify-center items-center my-2`}>
            
            <Text style={tw`text-[17px] font-bold font-sans`}>
              5 Star Reviews
            </Text>
          </View>

          <Text style={tw`leading-[22px]`}>
            {params?.description || 'No Description Available'}
          </Text>
        </View>

        <View style={tw`flex-shrink-0`}>
          <TouchableOpacity
            style={tw`bg-[#4a7187] py-4 px-4 m-6 rounded-lg shadow-md shadow-black`}
            underlayColor="#0e0e0e"
          >
            <View style={tw`rounded-lg`}>
                <Text style={tw`text-white text-base text-center`}>BOOK THIS SERVICE</Text>
            </View>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BookingScreen