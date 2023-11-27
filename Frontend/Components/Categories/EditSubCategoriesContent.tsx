import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import EditCategoryIcons from '../Category/EditCategoryIcons';
import {EditSubCategoriesContentProps} from '../../general/interfaces';

export default function EditSubCategoriesContent({
  dir,
  category,
}: EditSubCategoriesContentProps): JSX.Element {
  return (
    <ListItem.Content>
      <View
        style={
          dir === 'rtl' ? styles.rowContainerSubRtl : styles.rowContainerSubLtr
        }>
        {dir === 'ltr' ? (
          <Icon name={category?.iconName} type={category?.iconType} />
        ) : null}
        {dir === 'rtl' ? (
          <EditCategoryIcons
            dir={dir}
            isSubCategory={true}
            category={category}
          />
        ) : null}
        <ListItem.Title
          style={
            dir === 'rtl' ? styles.subListTitleRtl : styles.subListTitleLtr
          }>
          {category?.name}
        </ListItem.Title>
        {dir === 'rtl' ? (
          <Icon name={category?.iconName} type={category?.iconType} />
        ) : null}
        {dir === 'ltr' ? (
          <EditCategoryIcons
            dir={dir}
            isSubCategory={true}
            category={category}
          />
        ) : null}
      </View>
    </ListItem.Content>
  );
}

const styles = StyleSheet.create({
  rowContainerSubRtl: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: 60,
  },
  rowContainerSubLtr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subListTitleRtl: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subListTitleLtr: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
