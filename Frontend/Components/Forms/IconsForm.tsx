import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Button, Text} from '@rneui/themed';
import {IconFormProps} from '../../general/interfaces';
import {Stack} from '@rneui/layout';

export default function IconsForm({
  clearChoice,
  titleCat,
  onIconPress,
  clickedChoice,
}: IconFormProps): JSX.Element {
  const iconsToRender = [
    [
      {name: 'brush', type: 'materialIcons'},
      {name: 'book', type: 'entypo'},
      {name: 'briefcase', type: 'entypo'},
      {name: 'paw', type: 'foundation'},
      {name: 'shopping-cart', type: 'materialIcons'},
    ],
    [
      {name: 'directions-car', type: 'materialIcons'},
      {name: 'sports-gymnastics', type: 'materialIcons'},
      {name: 'home', type: 'antDesign'},
      {name: 'globe', type: 'entypo'},
      {name: 'medical-services', type: 'materialIcons'},
    ],
  ];
  return (
    <View style={styles.contanier}>
      <Stack row spacing={5}>
        <Button
          size="sm"
          title="Clear"
          titleStyle={styles.buttonTitle}
          onPress={clearChoice}
        />
        <Text>{`Add an icon to the ${titleCat}`}</Text>
      </Stack>
      <View style={styles.seconsdaryContanier}>
        {iconsToRender.map((row, index) => (
          <View key={index} style={styles.rowContainer}>
            {row.map((icon, ind) => (
              <Icon
                key={ind}
                iconStyle={
                  clickedChoice === icon.name ? styles.clickedIcon : undefined
                }
                containerStyle={styles.icon}
                name={icon.name}
                type={icon.type}
                onPress={() => onIconPress(icon)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contanier: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginBottom: 10,
  },
  seconsdaryContanier: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 13,
    color: 'white',
  },
  clickedIcon: {
    backgroundColor: '#348ceb',
  },
  icon: {
    padding: 10,
  },
});
