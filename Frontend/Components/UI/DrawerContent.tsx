import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import Categories from '../Categories/Categories';
import {DrawerContentProps} from '../../general/interfaces';

export default function DrawerContent({
  screenChanger,
  closeDrawer,
}: DrawerContentProps) {
  const navRoutes = [
    {name: 'Home', icon: 'home', changeRoute: () => screenChanger('Home')},
    {name: 'User', icon: 'user', changeRoute: () => screenChanger('User')},
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
          <Icon name={route?.icon} type="feather" />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>
              {route?.name}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      <Categories />
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
