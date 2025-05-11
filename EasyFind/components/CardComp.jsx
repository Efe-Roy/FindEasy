import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const CardComp = ({ item, clientAddress }) => {
  const { name, description, address } = item;
  // const [travelTimeInfo, setTravelTimeInfo] = useState(null);
  

  // const origin = address? address : ''
  // const destination = clientAddress? clientAddress : ''

  // const getTravelTime = async () => {
  //   fetch(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=AIzaSyB_7IsyO3Bv6-k3Yog-SbW3VNc7EKN1u3c&language=es`
  //   )
  //   .then((res)=> res.json())
  //   .then((data) => {
  //     // console.log({
  //     //     '1 Travel Time Information Main': data.rows[0].elements[0],
  //     //     'Distance': data.rows[0].elements[0].distance.text,
  //     //     'Travel Time': data.rows[0].elements[0].duration.text,
  //     //     'Duration Value': data.rows[0].elements[0].duration.value,
  //     // });
  //     if (data.rows[0]?.elements[0]?.status === 'OK') {
  //         console.log("OK");
  //         setTravelTimeInfo(data?.rows[0]?.elements[0])
  //         // calculateDeliveryFee(data?.rows[0]?.elements[0]?.distance?.text);
  //     } else {
  //       console.log("NOT_FOUND");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching travel time:", error);
  //   });
  // }

  // useEffect(() => {
  //   // console.log({origin, destination});
  //   if (!origin || !destination) return;
  //   getTravelTime();
  // }, [destination, origin])

  return (
    <View style={tw`rounded-3xl w-[300px] mb-6 bg-white`}>
        <View style={tw`relative rounded-3xl`}>
        {/* <Image source={{ uri: imgUrl }} style={tw`w-full h-44 rounded-3xl`} resizeMode="cover" /> */}
        <View style={tw`w-full h-44 rounded-3xl bg-blue-100`} />
        <View style={tw`absolute bottom-0 left-0 right-0 flex-row justify-between items-center p-3`}>
            <View style={tw`flex-row items-center bg-white rounded-3xl px-3 py-2`}>
            {/* <Image source={{ uri: imgUrl }} style={tw`w-6 h-6 rounded-full mr-2`} /> */}
            <View style={tw`w-6 h-6 rounded-full mr-2 bg-blue-100`} />
            {/* <Text style={tw`text-base font-semibold text-gray-800`}>{service}</Text> */}
            </View>
            <View style={tw`bg-white px-3 py-2 rounded-3xl`}>
            <Text style={tw`text-base font-semibold text-gray-800`}>5⭐</Text>
            </View>
        </View>
        </View>
        <View style={tw`py-4 px-3`}>
        <View style={tw`flex-row justify-between items-center mb-1`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>{name}</Text>
            {/* <View style={tw`flex-row`} >
              <Text style={tw`text-base font-bold text-indigo-500 mr-2`}>{travelTimeInfo?.distance?.text}</Text>
              <Text style={tw`text-base font-bold text-indigo-500`}>{travelTimeInfo?.duration?.text}</Text>
            </View> */}
        </View>
        <Text style={tw`text-sm text-gray-600 leading-5`}>{description}</Text>
        </View>
    </View>
  )
}

export default CardComp