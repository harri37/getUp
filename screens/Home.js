import {View, Text} from 'react-native';
import React from 'react';
import Title from '../components/Title';
import Container from '../components/Container';

const Home = () => {
  return <Container children={<Title text="Good Morning, Harrison" />} />;
};

export default Home;
