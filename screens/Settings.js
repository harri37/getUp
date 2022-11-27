import {Switch} from 'react-native';
import React, {useContext} from 'react';
import Container from '../components/Container';
import {AppContext} from '../helper/AppContext';
import Title from '../components/Title';
import PageLink from '../components/PageLink';
import PageList from './PageList';

//renders switch for light mode / dark mode
const Settings = () => {
  const {theme, setTheme} = useContext(AppContext);
  return (
    <Container
      children={
        <>
          <Title text="Settings" />
          <Switch
            trackColor={{false: 'red', true: 'green'}}
            value={theme === 'dark'}
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </>
      }
    />
  );
};

export default Settings;
