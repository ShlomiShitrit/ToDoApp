import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {EditCategoriesAccordionContentProps} from '../../general/interfaces';

export default function EditCategoriesAccordionContent({
  dir,
}: EditCategoriesAccordionContentProps): JSX.Element {
  return (
    <>
      <ListItem.Content
        style={dir === 'rtl' ? styles.contentRtl : styles.contentLtr}>
        {dir === 'ltr' ? (
          <Icon style={styles.icon} name="layer-group" type="font-awesome-5" />
        ) : null}
        <ListItem.Title style={styles.listTitle}>
          Edit Categories
        </ListItem.Title>
        {dir === 'rtl' ? (
          <Icon style={styles.icon} name="layer-group" type="font-awesome-5" />
        ) : null}
      </ListItem.Content>
    </>
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
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 15,
    marginRight: 15,
  },
});
