import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.push("/[username]/threads")}>
          <Text>Threads</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("/[username]/threads")>
          <Text>Replies</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("/[username]/threads")>
          <Text>Reposts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
