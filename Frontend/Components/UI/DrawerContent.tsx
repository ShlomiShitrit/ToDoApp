import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Icon, Button} from '@rneui/themed';
import Categories from '../Categories/Categories';
import {DrawerContentProps} from '../../general/interfaces';
import {useAppSelector, useAppDispatch} from '../../hooks/store';
import {userAction} from '../../store/userSlice';

export default function DrawerContent({
  screenChanger,
  closeDrawer,
}: DrawerContentProps) {
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
    <View style={styles.container}>
      <Icon
        name="close"
        color="white"
        type="AntDesign"
        onPress={closeDrawer}
        style={styles.icon}
      />
      {navRoutes.map((route, index) => (
        <ListItem
          key={index}
          containerStyle={styles.listItem}
          onPress={route?.changeRoute}>
          <Icon name={route?.icon} type={route?.iconType} />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>
              {route?.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      {isLoggedIn ? <Categories /> : null}
      <Button title="Logout" onPress={() => dispatch(userAction.logout())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#262c2e',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  icon: {
    marginTop: 10,
    marginLeft: 250,
  },
  listItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
