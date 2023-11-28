import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import {useAppSelector} from '../../hooks/store';
import {EditCategoryIconsProps} from '../../general/interfaces';
import {API_HOST} from '@env';
import UpdateCategoryDialog from '../Dialogs/UpdateCategoryDialog';
import DeleteCategoryDialog from '../Dialogs/DeleteCategoryDialog';

export default function EditCategoryIcons({
  dir,
  isSubCategory,
  category,
}: EditCategoryIconsProps): JSX.Element {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

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
        setOpenDelete(false);
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
        <Icon
          name={'delete'}
          type={'materialIcons'}
          onPress={() => setOpenDelete(true)}
        />
        <Icon
          style={styles.icon}
          name={'edit'}
          type={'materialIcons'}
          onPress={() => setOpenEdit(true)}
        />
      </View>
      <UpdateCategoryDialog
        open={openEdit}
        onBackPress={() => setOpenEdit(false)}
        isSubCategory={isSubCategory}
        category={category}
      />
      <DeleteCategoryDialog
        open={openDelete}
        onBackPress={() => setOpenDelete(false)}
        editHandler={deleteHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({
  editContainer: {
    flexDirection: 'row',
  },
  editMarginRtl: {
    marginRight: '40%',
  },
  editMarginLtr: {
    marginLeft: '40%',
  },
  icon: {
    marginLeft: '20%',
  },
});
