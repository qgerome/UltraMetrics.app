import { View, SafeAreaView, Image, StyleSheet, Platform, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import manager from '@/utils/ble';
import { useEffect, useState } from 'react';
import { Device, Subscription } from 'react-native-ble-plx';
import { ThemedText } from '@/components/ThemedText';
import { Buffer } from 'buffer';
import { IconSymbol } from '@/components/ui/IconSymbol';

const DeviceSummary = ({device}: {device: Device}) => {
  const [hr, setHr] = useState<string| null>("")
  useEffect(() => {
    console.log("Loading characteristics")
    let subscription: Subscription | null = null
    device.connect().then(() =>
      device.discoverAllServicesAndCharacteristics()
    ).then(() =>
      subscription = device.monitorCharacteristicForService(
        "180D",
        "2A37",
        (error, characteristic) => {
          if (error) {
            console.log(error.message);
            return;
          }
          if (!characteristic?.value) {
            return 
          }
          const buffer = Buffer.from(characteristic.value, "base64");
          setHr(buffer[1].toString())
        }
      )
    )
    return () => {
      subscription?.remove()
    }

  }, [device])

  return <View style={styles.device}>
    <ThemedText type="subtitle">{device.name}</ThemedText>
    <View style={styles.hrContainer}>
      <IconSymbol name="heart.fill" size={24} color="red" />
      <ThemedText type="subtitle">{hr}</ThemedText>
    </View>
  </View>
}

export default function HomeScreen() {
  const [devices, setDevices] = useState<Device[]>([])
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        console.log("PoweredOn")
        subscription.remove()
        setIsReady(true)
      }
    }, true)
    return () => {
      subscription.remove()
    }

  }, [manager])

  
  useEffect(() => {
    if (isReady) {
      manager.connectedDevices([
        '180D', // Heart Rate Service
        '1816', // Cycling Speed and Cadence
        '1818'  // Cycling Power
      ]).then(devices => {
        devices.map(d => d.connect())
        setDevices(devices)
      })
    }
  }, [isReady])
  return (
    <SafeAreaView style={devices.length === 0 ? styles.helloWaveContainer : styles.devicesContainer}>
      {devices.length === 0 ? <HelloWave /> : devices.map(device => <DeviceSummary key={device.id} device={device}/>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  helloWaveContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devicesContainer: {
    flex: 1,
    gap: 8,
  },
  hrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  device: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    margin: 10,
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    gap:4

  },
});
