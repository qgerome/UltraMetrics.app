import { navigate } from "@/navigators/navigationUtilities"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../components"
import { $styles } from "../theme"

export const HomeScreen: FC = function HomeScreen(_props) {
  const { themed } = useAppTheme()

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.container, themed($container)]}
    >
      <View style={themed($headerRow)}>
        <Text preset="heading">Home</Text>
        <View style={themed($headerRowIcons)}>
          <Icon icon="more" size={24} onPress={() => console.log("plus")} />
          <Icon
            icon="settings"
            size={24}
            onPress={() => navigate("Settings", { screen: "Settings" })}
          />
        </View>
      </View>
      <View style={themed($nextEvent)}>
        <Text preset="subheading">Next Event</Text>
      </View>
    </Screen>
  )
}

const $headerRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.md,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
})

const $item: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $itemsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.xl,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $headerRowIcons: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
})

const $nextEvent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
