import { Button, Screen, Text } from "@/components"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ImageBackground, ImageStyle, SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeBanner = require("../../assets/images/welcome-banner.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { themed, theme } = useAppTheme()

  const { navigation } = _props

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <ImageBackground style={themed($welcomeLogo)} source={welcomeBanner} resizeMode="cover">
        <SafeAreaView style={themed($headingContainer)}>
          <Text weight="bold" text={"UltraMetrics"} style={themed($headingStyle)} />
        </SafeAreaView>
      </ImageBackground>

      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Text text={"Follow your performances"} style={themed($bottomContainerText)} />
        <Button
          style={{ width: "100%" }}
          preset="filled"
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Button>
        <Button
          style={{ width: "100%" }}
          testID="next-screen-button"
          preset="default"
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Button>
      </View>
    </Screen>
  )
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "100%",
  justifyContent: "center",
  alignItems: "center",
})

const $headingContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
})

const $headingStyle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  paddingTop: spacing.xxl + spacing.xl,
  fontSize: 48,
  lineHeight: 48,
  fontWeight: "bold",
  color: colors.palette.neutral100,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  paddingVertical: spacing.xl,
  alignItems: "center",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  gap: spacing.md,
})

const $bottomContainerText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 28,
  lineHeight: 28,
  marginBottom: spacing.md,
  fontWeight: "bold",
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: "100%",
})
