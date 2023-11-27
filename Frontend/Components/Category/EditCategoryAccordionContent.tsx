import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import EditCategoryIcons from './EditCategoryIcons';
import {EditCategoryAccordionContentProps} from '../../general/interfaces';

export default function EditCategoryAccordionContent({
  category,
  dir,
}: EditCategoryAccordionContentProps): JSX.Element {
  return (
    <View
      style={dir === 'rtl' ? styles.rowContainerRtl : styles.rowContainerLtr}>
      {dir === 'ltr' ? (
        <Icon name={category?.iconName} type={category?.iconType} />
      ) : null}
      {dir === 'rtl' ? (
        <EditCategoryIcons
          dir={dir}
          isSubCategory={false}
          category={category}
        />
      ) : null}
      <ListItem.Title
        style={dir === 'rtl' ? styles.listTitleRtl : styles.listTitleLtr}>
        {category?.name}
      </ListItem.Title>
      {dir === 'rtl' ? (
        <Icon name={category?.iconName} type={category?.iconType} />
      ) : null}
      {dir === 'ltr' ? (
        <EditCategoryIcons
          dir={dir}
          isSubCategory={false}
          category={category}
        />
      ) : null}
    </View>
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
  listTitleRtl: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  listTitleLtr: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
