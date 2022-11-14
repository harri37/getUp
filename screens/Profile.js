import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import Title from '../components/Title';

const Profile = () => {
  return <Container children={<Title text="Profile" />} />;
};

export default Profile;
