import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Input} from '@rneui/themed';
import {AddCategoryDialogProps} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import {API_HOST} from '@env';

export default function AddCategory({
  open,
  onBackPress,
  isSubCategory,
  category,
  onUpdate,
}: AddCategoryDialogProps): JSX.Element {
  const [categoryName, setCategoryName] = useState<string>('');
  const userToken = useAppSelector(state => state.user.token);

  const titleCat = isSubCategory ? 'subcategory' : 'category';

  const onSubmit = async () => {
    const categoryToPost = {
      name: categoryName,
    };

    const url = isSubCategory ? `SubCategory/${category?.id}` : 'Category';

    try {
      const response = await fetch(`${API_HOST}api/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(categoryToPost),
      });

      if (response.ok) {
        console.log(`${titleCat} added successfully`);
        setCategoryName('');
        onUpdate();
        onBackPress();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Something went wrong');
      }
    } catch (error) {
      console.log(`Error adding ${titleCat}: `);
      console.log(error);
    }
  };

  return (
    <Dialog isVisible={open} onBackdropPress={onBackPress}>
      <Dialog.Title title={`Add ${titleCat}`} />
      <Input
        labelStyle={styles.label}
        label={`${titleCat} name`}
        placeholder={isSubCategory ? 'Groceries' : 'Home'}
        onChangeText={setCategoryName}
        value={categoryName}
      />
      <Dialog.Actions>
        <Dialog.Button title="Cancel" onPress={onBackPress} />
        <Dialog.Button title="Submit" onPress={onSubmit} />
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  label: {color: 'white'},
});
