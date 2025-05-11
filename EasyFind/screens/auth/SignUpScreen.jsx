//SignUpScreen
import { View, Text, StatusBar, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import tw from "twrnc";
import { useNavigation } from '@react-navigation/native';
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from "firebase/auth";
import { auth } from '../../config';


export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [role, setRole] = useState('user');
  const navigation = useNavigation();

  const handleSignUp = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please re-enter email');
      return;
    }
    if (password != password2) {
      Alert.alert('Passowrd does not match', 'Please check the password and re-enter both password');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Set role in the displayName field
        updateProfile(user, { displayName: role })
          .then(() => {
            Alert.alert("Sign-up successfully!", `Hello, ${user.email} as ${role}`);
            navigation.navigate("login");
          })
          .catch((error) => {
            Alert.alert("Failed to update profile", error.message);
          });
      })
      .catch((error) => {
        Alert.alert('sign-up failed!', error.message);
      });
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-[#F5F5F5]`}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={true}
      />

      <Text style={tw`text-center text-5xl font-bold text-gray-900`}>FindEasy</Text>
      <Text style={tw`text-center text-base text-gray-700`}>Sign up for an account</Text>

      <View style={tw.style(`bg-white rounded-3xl px-8 py-8 w-[90%] mt-4`)} >
        <View>
          <Text style={tw`text-gray-700 ml-4`}>Email</Text>  
          <TextInput 
            autoCapitalize="none"
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            placeholder="Input your email"
            onChangeText={setEmail}
          />
          <Text style={tw`text-gray-700 ml-4`}>Password</Text>
          <TextInput 
            autoCapitalize="none"
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Input Password"
          />
          <Text style={tw`text-gray-700 ml-4`}>Confirm Password</Text>
          <TextInput 
            autoCapitalize="none"
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            secureTextEntry
            onChangeText={setPassword2}
            placeholder="Comfirm Password"
          />

          <Text style={tw`text-gray-700 ml-4`}>Select Role</Text>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={tw`p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
          >
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Service Provider" value="provider" />
          </Picker>

          <TouchableOpacity onPress={()=> handleSignUp()} style={tw`py-3 bg-[#1E90FF] rounded-xl mt-5`}>
            <Text style={tw`text-xl font-bold text-center text-gray-100`}> SIGNUP </Text>
          </TouchableOpacity>
          
        </View>
        
        
        <View style={tw`flex-row justify-center mt-7`}>
          <Text style={tw`text-gray-500 font-semibold`}>
          already have account?
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("login")}>
              <Text style={tw`font-semibold text-blue-500 underline`}> LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  )
}