import { ActivityIndicator, Button, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import manager from '@/utils/ble';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Device } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-native-safe-area-context';

const DeviceRow = ({ device }: { device: Device }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    device.isConnected().then(isConnected => {
      setIsConnected(isConnected);
      setIsLoading(false);
    });
  }, [device]);

  async function connectToDevice() {
    await device.connect();
    console.log('Connected');
    await device.discoverAllServicesAndCharacteristics();
    console.log('connected', device.services);
  }

  return (
    <ThemedView style={styles.device}>
      <ThemedText>{device.name}</ThemedText>
      {isLoading && <ActivityIndicator />}
      {!isLoading && isConnected && <Ionicons name="checkmark" color="green" />}
      {!isLoading && !isConnected && <Button title="Connect" onPress={connectToDevice} />}
    </ThemedView>
  );
};

export default function TabSensorsScreen() {
  const [isScanning, setIsScanning] = useState(false);
  useEffect(() => {
    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      }
    }, true);
    return () => {
      subscription.remove();
      manager.stopDeviceScan();
    };
  }, [manager]);

  const [devices, setDevices] = useState<Device[]>([]);

  function scanAndConnect() {
    setIsScanning(true);
    manager.startDeviceScan(
      [
        '180D', // Heart Rate Service
        '1816', // Cycling Speed and Cadence
        '1818', // Cycling Power
      ],
      null,
      async (error, device) => {
        if (error || !device) {
          // Handle error (scanning will be stopped automatically)
          return;
        }
        if (!devices.find(d => d.id === device.id)) {
          setDevices([...devices, device]);
        }
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Sensors</ThemedText>
      </View>
      <ScrollView>
        {devices.length === 0 && isScanning && (
          <ThemedText style={styles.device}>Scanning...</ThemedText>
        )}
        {devices.map(device => (
          <DeviceRow key={device.id} device={device} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  device: {
    marginHorizontal: 10,
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
