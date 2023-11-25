import React, {useRef, useState, useEffect} from 'react';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  NativeModules,
  Platform,
} from 'react-native';
import {ThemeProvider, createTheme} from '@rneui/themed';
import Header from './Components/UI/Header';
import HomeScreen from './Components/Screens/HomeScreen';
import UserScreen from './Components/Screens/UserScreen';
import CategoriesScreen from './Components/Screens/CategoriesScreen';
import DrawerContent from './Components/UI/DrawerContent';
import {screens} from './general/types';
import LoginScreen from './Components/Screens/LoginScreen';
import {useAppSelector, useAppDispatch} from './hooks/store';
import {ICategory} from './general/interfaces';
import {localeAction} from './store/localeSlice';
import {EMPTY_CATEGORY} from './general/resources';

export default function AppEntry() {
  const [currentScreen, setCurrentScreen] = useState('Home' as screens);
  const [currentCategory, setCurrentCategory] =
    useState<ICategory>(EMPTY_CATEGORY);
  const [isSubCategory, setIsSubCategory] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const deviceLanguage =
      Platform.OS === 'android'
        ? NativeModules.I18nManager.localeIdentifier
        : null;

    if (deviceLanguage !== null) {
      if (deviceLanguage === 'iw_IL') {
        dispatch(localeAction.setLocaleToHe());
      } else if (deviceLanguage === 'en_US') {
        dispatch(localeAction.setLocaleToEn());
      }
    }
  }, [dispatch]);

  const isLoggedIn = useAppSelector(state => state.user.loggedIn);

  const drawer = useRef<DrawerLayoutAndroid>(null);

  const darkTheme = createTheme({
    mode: 'dark',
    lightColors: {
      primary: '#BB86FC',
      secondary: '#03DAC6',
    },
    darkColors: {
      primary: '#439ce0',
      secondary: '#aa49eb',
    },
    components: {
      Text: {
        style: {
          color: '#FFFFFF',
        },
      },
      Button: {
        containerStyle: {
          backgroundColor: '#BB86FC',
        },
        buttonStyle: {},
        titleStyle: {
          color: '#FFFFFF',
        },
      },
    },
  });

  const screenChanger = (screen: screens, isSub: boolean = false) => {
    setCurrentScreen(screen);
    if (isSub) {
      drawer.current?.closeDrawer();
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <DrawerLayoutAndroid
        style={styles.layout}
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => (
          <DrawerContent
            screenChanger={screenChanger}
            closeDrawer={() => drawer.current?.closeDrawer()}
            setCurrentCategory={(category: ICategory) =>
              setCurrentCategory(category)
            }
            setIsSubCategory={(isSub: boolean) => setIsSubCategory(isSub)}
          />
        )}>
        <Header openDrawer={() => drawer.current?.openDrawer()} />
        {isLoggedIn ? null : <LoginScreen />}
        {currentScreen === 'Home' && isLoggedIn ? <HomeScreen /> : null}
        {currentScreen === 'User' && isLoggedIn ? <UserScreen /> : null}
        {currentScreen === 'Categories' && isLoggedIn ? (
          <CategoriesScreen
            category={currentCategory}
            isSubCategory={isSubCategory}
          />
        ) : null}
      </DrawerLayoutAndroid>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#262c2e',
  },
});
