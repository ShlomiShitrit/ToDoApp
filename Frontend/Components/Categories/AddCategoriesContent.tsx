import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {AddCategoryContentProps} from '../../general/interfaces';

export default function AddCategoryContent({
  dir,
  setOpen,
}: AddCategoryContentProps): JSX.Element {
  return (
    <ListItem.Content
      style={dir === 'rtl' ? styles.contentRtl : styles.contentLtr}>
      {dir === 'ltr' ? (
        <Icon style={styles.icon} name="plus" type="ant-design" />
      ) : null}
      <ListItem.Title style={styles.listTitle} onPress={setOpen}>
        Add Category
      </ListItem.Title>
      {dir === 'rtl' ? (
        <Icon style={styles.icon} name="plus" type="ant-design" />
      ) : null}
    </ListItem.Content>
  );
}

const styles = StyleSheet.create({
  contentRtl: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  contentLtr: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
    marginRight: 15,
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
