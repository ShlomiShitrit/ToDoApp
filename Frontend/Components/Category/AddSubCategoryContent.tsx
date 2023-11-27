import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {AddSubCategoryContentProps} from '../../general/interfaces';

export default function AddSubCategoryContent({
  dir,
  setOpen,
}: AddSubCategoryContentProps): JSX.Element {
  return (
    <ListItem.Content>
      <View
        style={dir === 'rtl' ? styles.rowContainerRtl : styles.rowContainerLtr}>
        {dir === 'ltr' ? <Icon name="plus" type="ant-design" /> : null}
        <ListItem.Title
          style={
            dir === 'rtl'
              ? styles.addSubListTitleRtl
              : styles.addSubListTitleLtr
          }
          onPress={setOpen}>
          Add subcategory
        </ListItem.Title>
        {dir === 'rtl' ? <Icon name="plus" type="ant-design" /> : null}
      </View>
    </ListItem.Content>
  );
}

const styles = StyleSheet.create({
  rowContainerRtl: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
  rowContainerLtr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSubListTitleRtl: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addSubListTitleLtr: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
