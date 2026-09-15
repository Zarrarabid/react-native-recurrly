import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-light-bg">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href={"./onboarding"} className="p-4 text-black" >
      Go to Onboard
      </Link>
      <Link href="./(tabs)/sign-in" className="p-4 text-black" >
      Sign IN
      </Link>
      <Link href="./subscriptions/spotify" className="p-4 text-black" >
      Spotify Subscriptions
      </Link>

      <Link href={{
        pathname: "/subscriptions/[id]",
        params: {id: "claude"}
      }} className="p-4 text-black" >
      Claude Max Subscriptions
      </Link>
    </View>
  );
}