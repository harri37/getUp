//My react native classes imported images like this in some example code but
//it seems pretty unecessary imo

import homeIcon from '../assets/icons/home.png';
import plusIcon from '../assets/icons/plus.png';
import settingsIcon from '../assets/icons/settings.png';
import userIcon from '../assets/icons/user.png';
import homeIconSolid from '../assets/icons/home-solid.png';
import plusIconSolid from '../assets/icons/plus-solid.png';
import settingsIconSolid from '../assets/icons/settings-solid.png';
import userIconSolid from '../assets/icons/user-solid.png';
import chevronIconBlack from '../assets/icons/chevron-down-black.png';
import crossIconBlack from '../assets/icons/cross-black.png';
import chevronIconWhite from '../assets/icons/chevron-down-white.png';
import crossIconWhite from '../assets/icons/cross-white.png';

export const tabIcons = {
  homeIcon: homeIcon,
  plusIcon: plusIcon,
  userIcon: userIcon,
  homeIconSolid: homeIconSolid,
  plusIconSolid: plusIconSolid,
  userIconSolid: userIconSolid,
};

export const dropdownIcons = {
  light: {
    chevronIcon: chevronIconWhite,
    crossIcon: crossIconWhite,
  },
  dark: {
    chevronIcon: chevronIconBlack,
    crossIcon: crossIconBlack,
  },
};
