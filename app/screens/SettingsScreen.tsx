import { Button, Screen, Text } from "@/components"
import { $styles } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { AppStackScreenProps } from "../navigators"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"

interface SettingsScreenProps extends AppStackScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen(_props) {
  const { themed, theme } = useAppTheme()

  const { navigation } = _props

  useHeader({
    title: "Settings",
    leftIcon: "back",
    onLeftPress: () => navigation.goBack(),
  })

  const {
    authenticationStore: { logout },
  } = useStores()

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={[$styles.container, $styles.flex1]}
      safeAreaEdges={["top"]}
    >
      <Button onPress={logout}>Log out</Button>
    </Screen>
  )
})
