//LoginScreen
import { View, Text, StatusBar, TouchableOpacity, Image, TextInput, SafeAreaView, Dimensions, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../../config';
import i18n from '../../components/i18n';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is already logged in, redirect them to the main page
        if (user.displayName === "provider") {
          navigation.navigate("provider")
        } else {
          navigation.navigate("main")
        }
      } else {
        console.log("not existing");
        
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email', 'Please re-enter email');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          console.log("User Role:", user.displayName); // 'user' or 'service_provider'
          if (user.displayName === "provider") {
            navigation.navigate("provider")
          } else {
            navigation.navigate("main")
          }
        }
        Alert.alert('Login successful!', `Hello, ${user.email}`);
      })
      .catch((error) => {
        console.log("ll", error.message);
        Alert.alert('Login failed!', error.message);
      });
  };


  const [language, setLanguage] = useState(i18n.locale);

  const switchLanguage = (lang) => {
    i18n.locale = lang;
    setLanguage(lang); // force re-render
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-[#F5F5F5]`}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={true}
      />

      <Text style={tw`text-center text-5xl font-bold text-gray-900`}>FindEasy</Text>
      <Text style={tw`text-center text-base text-gray-700`}>Sign in to your account</Text>
      <Text style={{ fontSize: 24 }}>{i18n.t('welcome')}</Text>
      {/* <Text style={{ marginVertical: 10 }}>{i18n.t('greeting')}</Text>

      <Button title="English" onPress={() => switchLanguage('en')} />
      <Button title="Español" onPress={() => switchLanguage('es')} /> */}

      <View style={tw.style(`bg-white rounded-3xl px-8 py-8 w-[90%] mt-4`)} >
        <View>
          <Text style={tw`text-gray-700 ml-4`}>email</Text>  
          <TextInput 
            autoCapitalize="none"
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3`}
            placeholder="Input your email"
            onChangeText={setEmail}
          />
          <Text style={tw`text-gray-700 ml-4`}>Password</Text>
          <TextInput 
            autoCapitalize="none"
            style={tw`p-4 bg-gray-100 text-gray-700 rounded-2xl`}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Input Password"
          />
          <TouchableOpacity style={tw`flex items-end`}>
            <Text style={tw`text-gray-700 mb-5`}>forget password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> handleLogin()} style={tw`py-3 bg-[#1E90FF] rounded-xl`}>
            <Text style={tw`text-xl font-bold text-center text-gray-100`}> LOGIN </Text>
          </TouchableOpacity>
          
        </View>
        
        <Text style={tw`text-xl text-gray-700 font-bold text-center py-5`}>Or</Text>
        <View style={tw`flex-row justify-center`}>
          <TouchableOpacity 
            style={tw`p-2 bg-gray-100 rounded-2xl mx-1`}
          >
            <Image source={require('../../assets/icons/google.png')} style={tw`w-10 h-10`} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`p-2 bg-gray-100 rounded-2xl mx-1`}
          >
            <Image source={require('../../assets/icons/apple.png')} style={tw`w-10 h-10`} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`p-2 bg-gray-100 rounded-2xl mx-1`}
          >
            <Image source={require('../../assets/icons/facebook.png')} style={tw`w-10 h-10`} />
          </TouchableOpacity>
          
        </View>
        <View style={tw`flex-row justify-center mt-7`}>
          <Text style={tw`text-gray-500 font-semibold`}>
          don't have account?
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("signup")}>
              <Text style={tw`font-semibold text-red-500`}> SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  )
}