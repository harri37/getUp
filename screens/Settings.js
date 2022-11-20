import {Switch} from 'react-native';
import React, {useContext} from 'react';
import Container from '../components/Container';
import {AppContext} from '../helper/AppContext';

//renders switch for light mode / dark mode
const Settings = () => {
  const {theme, setTheme} = useContext(AppContext);
  return (
    <Container
      children={
        <Switch
          trackColor={{false: 'red', true: 'green'}}
          value={theme === 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      }
    />
  );
};

export default Settings;
