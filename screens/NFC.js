import {View, Text} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {useFocusEffect} from '@react-navigation/native';

const NFC = ({navigation}) => {
  /**
   * Screen for NFC disable option
   *
   * @param {navigation} navigation - navigation object
   * @returns render for NFC screen
   */
  const [tagRead, setTagRead] = useState(false);
  const [supported, setSupported] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('cancelling tech request');
      NfcManager.cancelTechnologyRequest();
    });
    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    //Check if nfc is supported on page focus
    useCallback(() => {
      console.log('initial check');
      const checkNFC = async () => {
        const supported = await NfcManager.isSupported();
        setSupported(supported);
        if (supported) {
          NfcManager.start();
        }
      };
      setTagRead(false);
      checkNFC();
      setLoading(false);

      //cancel nfc request on page unfocus
      return () => {
        console.log('clean up');
        NfcManager.cancelTechnologyRequest();
      };
    }, []),
  );

  useEffect(() => {
    /**
     * Reads NFC tag
     */
    const readTag = async () => {
      try {
        console.log('reading tag');
        console.log('requesting technology');
        await NfcManager.requestTechnology(NfcTech.Ndef);
        console.log('getting tag');
        await NfcManager.getTag();
        //disable alarm here
        setTagRead(true);
      } catch (ex) {
        console.log("Couldn't read tag");
      } finally {
        console.log('finally');
        NfcManager.cancelTechnologyRequest();
      }
    };

    //only read tag if nfc is supported
    if (supported) {
      readTag();
    }
  }, [supported]);

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <Container
      children={
        <>
          <Title text="NFC" />
          <Text>
            {supported
              ? tagRead
                ? 'Tag read'
                : 'No tag read'
              : 'NFC not supported'}
          </Text>
        </>
      }
    />
  );
};

export default NFC;
