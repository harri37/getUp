import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import PageLink from '../components/PageLink';

const PageList = ({navigation}) => {
  return (
    <Container
      children={
        <>
          <Title text="Page List (testing only)" />
          <PageLink
            to="Memory Game"
            text="Memory Game"
            navigation={navigation}
          />
        </>
      }
    />
  );
};

export default PageList;
