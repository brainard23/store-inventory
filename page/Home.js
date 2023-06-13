import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';

const Home = ({ navigation }) => {
  const [barcode, setBarcode] = useState(null);
  const isFocused = useIsFocused();

  const handleBarcodeScan = ({ barcodes }) => {
    if (barcodes.length > 0) {
      setBarcode(barcodes[0].data);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setBarcode(null);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        onBarCodeRead={handleBarcodeScan}
      />
      {barcode && <Text style={styles.barcodeText}>{barcode}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  barcodeText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Home;
