import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import PageLink from '../components/PageLink';

const Profile = ({navigation}) => {
  return (
    <Container
      children={
        <>
          <Title text="Profile" />
          <PageLink to="Settings" navigation={navigation} text="Settings" />
        </>
      }
    />
  );
};

export default Profile;
