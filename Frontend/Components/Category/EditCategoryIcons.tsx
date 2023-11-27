import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {useAppSelector} from '../../hooks/store';
import {EditCategoryIconsProps} from '../../general/interfaces';
import {API_HOST} from '@env';
import UpdateCategory from '../Dialogs/UpdateCategory';

export default function EditCategoryIcons({
  dir,
  isSubCategory,
  category,
}: EditCategoryIconsProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const marginStyle =
    dir === 'rtl' ? styles.editMarginRtl : styles.editMarginLtr;

  const userToken = useAppSelector(state => state.user.token);

  const deleteHandler = async () => {
    const url = isSubCategory ? 'subCategories' : 'Category';
    try {
      const response = await fetch(`${API_HOST}api/${url}/${category?.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.ok) {
        console.log('Deleted');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={[styles.editContainer, marginStyle]}>
        <Icon name={'delete'} type={'materialIcons'} onPress={deleteHandler} />
        <Icon
          name={'edit'}
          type={'materialIcons'}
          onPress={() => setOpen(true)}
        />
      </View>
      <UpdateCategory
        open={open}
        onBackPress={() => setOpen(false)}
        isSubCategory={isSubCategory}
        category={category}
      />
    </>
  );
}

const styles = StyleSheet.create({
  editContainer: {
    flexDirection: 'row',
  },
  editMarginRtl: {
    marginRight: '50%',
  },
  editMarginLtr: {
    marginLeft: '50%',
  },
});
