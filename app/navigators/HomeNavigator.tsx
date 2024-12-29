import { HomeScreen } from "@/screens/HomeScreen"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type HomeParamList = {
  HomeIndex: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type HomeScreenProps<T extends keyof HomeParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Stack = createNativeStackNavigator<HomeParamList>()

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeIndex" component={HomeScreen} />
    </Stack.Navigator>
  )
}
