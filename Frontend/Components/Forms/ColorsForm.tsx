import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {ColorFormProps} from '../../general/interfaces';
import {Stack} from '@rneui/layout';

export default function IconsForm({
  clearChoice,
  titleCat,
  onColorPress,
  clickedChoice,
}: ColorFormProps): JSX.Element {
  const colorToRender = [
    ['#348ceb', '#f5a623', '#f8e71c', '#8b572a', '#7ed321'],
    ['#417505', '#bd10e0', '#9013fe', '#4a90e2', '#50e3c2'],
    ['#b8e986', '#000000', '#4a4a4a', '#9b9b9b', '#f9f9f9'],
  ];

  return (
    <View style={styles.container}>
      <Stack row spacing={5}>
        <Button
          size="sm"
          title="Clear"
          titleStyle={styles.buttonTitle}
          onPress={clearChoice}
        />
        <Text>{`Add an color to the ${titleCat}`}</Text>
      </Stack>
      <View style={styles.secondaryContainer}>
        {colorToRender.map((row, index) => (
          <Stack style={styles.stack} key={index} row spacing={5}>
            {row.map((color, ind) => (
              <TouchableOpacity
                style={clickedChoice === color ? styles.touchable : undefined}
                onPress={() => onColorPress(color)}
                key={ind}>
                <View style={[styles.colorBox, {backgroundColor: color}]} />
              </TouchableOpacity>
            ))}
          </Stack>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  secondaryContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorBox: {
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  stack: {
    marginTop: 12,
  },
  buttonTitle: {
    fontSize: 13,
    color: 'white',
  },
  touchable: {borderColor: 'white', borderWidth: 2},
});
