import React from 'react';
import {StyleSheet} from 'react-native';
import {Header as HeaderComp, Icon} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {HeaderProps} from '../../general/interfaces';

export default function Header({openDrawer}: HeaderProps) {
  return (
    <SafeAreaProvider>
      <HeaderComp
        rightComponent={
          <View>
            <Icon
              onPress={openDrawer}
              name="menu"
              color="white"
              type="feather"
            />
          </View>
        }
        centerComponent={{text: 'To Do App', style: styles.heading}}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
});
