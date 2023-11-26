import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ListItem, Icon, Button} from '@rneui/themed';
import Categories from '../Categories/Categories';
import {DrawerContentProps} from '../../general/interfaces';
import {useAppSelector, useAppDispatch} from '../../hooks/store';
import {userAction} from '../../store/userSlice';
import useLang from '../../hooks/useLang';

export default function DrawerContent({
  screenChanger,
  closeDrawer,
  setCurrentCategory,
  setIsSubCategory,
  isSubCategory,
}: DrawerContentProps) {
  const {dir} = useLang();
  const isLoggedIn = useAppSelector(state => state.user.loggedIn);
  const dispatch = useAppDispatch();

  const navRoutes = [
    {
      name: 'Home',
      icon: 'home',
      iconType: 'feather',
      changeRoute: () => screenChanger('Home'),
    },
    {
      name: 'User',
      icon: 'user',
      iconType: 'feather',
      changeRoute: () => screenChanger('User'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.secondaeyContainer}>
        <Icon
          name="close"
          color="white"
          type="AntDesign"
          onPress={closeDrawer}
          style={dir === 'ltr' ? styles.iconLtr : styles.iconRtl}
        />
        {navRoutes.map((route, index) => (
          <ListItem
            key={index}
            containerStyle={styles.listItem}
            onPress={route?.changeRoute}>
            {dir === 'ltr' ? (
              <Icon name={route?.icon} type={route?.iconType} />
            ) : null}
            <ListItem.Content>
              <ListItem.Title
                style={
                  dir === 'rtl' ? styles.listTitleRtl : styles.listTitleLtr
                }>
                {route?.name}
              </ListItem.Title>
            </ListItem.Content>
            {dir === 'rtl' ? (
              <Icon name={route?.icon} type={route?.iconType} />
            ) : null}
          </ListItem>
        ))}
        {isLoggedIn ? (
          <Categories
            setCurrentCategory={setCurrentCategory}
            setIsSubCategory={setIsSubCategory}
            screenChanger={screenChanger}
            isSubCategory={isSubCategory}
          />
        ) : null}
        <Button
          title="Logout"
          containerStyle={styles.button}
          onPress={() => dispatch(userAction.logout())}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262c2e',
  },
  secondaeyContainer: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#262c2e',
  },
  iconRtl: {
    marginTop: 10,
    marginRight: 250,
  },
  iconLtr: {
    marginTop: 20,
    marginLeft: 250,
  },
  listItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  listTitleRtl: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
  },
  listTitleLtr: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
  },
  button: {
    marginTop: 30,
    width: '30%',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
