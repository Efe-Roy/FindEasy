import { View, Text, ActivityIndicator, Button, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, set, update, remove } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import tw from "twrnc";
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { auth } from "../../config";

const ProviderScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    latitude: '',
    longitude: '',
    address: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchProfile(currentUser.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfile = async (uid) => {
    const db = getDatabase();
    const providerRef = ref(db, `providers/${uid}`);

    try {
      const snapshot = await get(providerRef);
      if (snapshot.exists()) {
        setProfile(snapshot.val());
        setFormData(snapshot.val()); // Pre-fill form with existing data
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    const db = getDatabase();
    const providerRef = ref(db, `providers/${user.uid}`);

    try {
      await set(providerRef, formData);
      setProfile(formData);
      setIsEditing(false);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    const db = getDatabase();
    const providerRef = ref(db, `providers/${user.uid}`);

    try {
      await update(providerRef, formData);
      setProfile(formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const deleteProfile = async () => {
    if (!user) return;

    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const db = getDatabase();
              const providerRef = ref(db, `providers/${user.uid}`);

              await remove(providerRef);
              setProfile(null);
              setFormData({ name: '', service: '', description: '', contact: '' });
              alert("Profile deleted successfully!");
            } catch (error) {
              console.error("Error deleting profile:", error);
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("login"); // Redirect to Login screen
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={tw`flex-1 pt-14 bg-white`}>
      <View style={tw`flex-1 items-center`}>
        {profile && !isEditing ? (
          <View style={tw`w-[90%]`}>
            <Text style={tw`text-xl font-bold text-center mb-5`}>Welcome, {profile.name}</Text>
            
            <Text style={tw`uppercase mb-1`}> SERVICE: <Text style={tw`font-bold`}>{profile.service}</Text></Text>
            <Text style={tw`uppercase mb-1`}> description: <Text style={tw`font-bold`}>{profile.description}</Text></Text>
            <Text style={tw`uppercase mb-1`}> address: <Text style={tw`font-bold`}>{profile.address}</Text></Text>
            <Text style={tw`uppercase mb-1`}> longitude: <Text style={tw`font-bold`}>{profile.longitude}</Text></Text>
            <Text style={tw`uppercase mb-1`}> latitude: <Text style={tw`font-bold`}>{profile.latitude}</Text></Text>
            
            <View style={tw`flex-row justify-center mt-5`}>
              <TouchableOpacity 
                onPress={() => setIsEditing(true)} 
                style={tw`rounded mr-2 bg-blue-500 justify-center p-2`}
              >
                <Text style={tw`text-white font-bold`}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={deleteProfile}
                style={tw`rounded mr-2 bg-red-500 justify-center p-2`}
              >
                <Text style={tw`text-white font-bold`}>Delete Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={tw`w-[90%] bg-white p-2`}>
            <Text style={tw`text-lg text-center font-bold`}>{profile ? "Edit Your Profile" : "Create Your Profile"}</Text>
            
            <Text style={tw`text-gray-700 ml-4`}>Address</Text>  
            <GooglePlacesAutocomplete
              placeholder="Input your Address"
              nearbyPlacesAPI="GooglePlacesSearch"
              styles={{
                  container: {
                      marginHorizontal: 2,
                      marginBottom: 6,
                      flex: 0,
                  },
                  textInput: {
                      fontSize: 14,
                      backgroundColor: "transparent",
                  },
                  textInputContainer: {
                      paddingHorizontal: 10,
                      paddingBottom: 0,
                      backgroundColor: "#f0f0f0",
                      borderRadius: 12,
                  },
              }}
              fetchDetails={true}
              debounce={300}
              onPress={(data, details = null) => {
                // const dataForm = {
                //   lat: details.geometry.location.lat,
                //   lng: details.geometry.location.lng,
                //   address: data.description
                // }
                // console.log(dataForm);
                setFormData({ 
                  ...formData, 
                  address: data.description,
                  latitude: details.geometry.location.lat,
                  longitude:  details.geometry.location.lng
                })
              }}
              query={{
                key: "AIzaSyBfnTMaraITkm6RdPtBPaxgK57tiqaKHGE",
                language: "en",
                components: "country:GB", // Restrict to United Kingdom
                location: "52.6369,-1.1398", // Leicester's coordinates
                radius: 15000,
              }}
            />
            <Text style={tw`text-gray-700 ml-4`}>Name</Text>  
            <TextInput 
              autoCapitalize="none"
              style={tw`p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3`}
              placeholder="Input your name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <Text style={tw`text-gray-700 ml-4`}>Service</Text>  
            <TextInput 
              autoCapitalize="none"
              style={tw`p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3`}
              placeholder="Input your Service"
              value={formData.service}
              onChangeText={(text) => setFormData({ ...formData, service: text })}
            />
            <Text style={tw`text-gray-700 ml-4`}>Description</Text>  
            <TextInput 
              autoCapitalize="none"
              style={tw`p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3`}
              placeholder="Input your Description"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
            
            
            <View style={tw`flex-row justify-center mt-5`}>
              <TouchableOpacity 
                onPress={profile ? updateProfile : saveProfile}
                style={tw`rounded mr-2 bg-blue-500 justify-center p-2`}
              >
                <Text style={tw`text-white font-bold`}>{profile ? "Update Profile" : "Create Profile"}</Text>
              </TouchableOpacity>

              {profile && 
                <TouchableOpacity 
                  onPress={() => setIsEditing(false)}
                  style={tw`rounded mr-2 bg-gray-800 justify-center p-2`}
                >
                  <Text style={tw`text-white font-bold`}>Go Back</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        )}

      </View>

      <View style={tw`flex-shrink-0 mb-5 px-5`}>
        <Button title="Logout" color="black" onPress={handleLogout} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProviderScreen;
