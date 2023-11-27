import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, Input} from '@rneui/themed';
import {AddCategoryDialogProps} from '../../general/interfaces';
import {categoryIcon} from '../../general/types';
import {useAppSelector} from '../../hooks/store';
import IconsForm from '../Forms/IconsForm';
import ColorsForm from '../Forms/ColorsForm';
import {API_HOST} from '@env';

export default function AddCategory({
  open,
  onBackPress,
  isSubCategory,
  category,
  onUpdate,
}: AddCategoryDialogProps): JSX.Element {
  const [categoryName, setCategoryName] = useState<string>('');
  const [iconToAdd, setIconToAdd] = useState<categoryIcon | null>();
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);
  const [clickedColor, setClickedColor] = useState<string | null>(null);

  const userToken = useAppSelector(state => state.user.token);

  const titleCat = isSubCategory ? 'subcategory' : 'category';

  const onSubmit = async () => {
    const categoryToPost = {
      name: categoryName,
      iconName: iconToAdd?.name,
      iconType: iconToAdd?.type,
      colorHash: clickedColor,
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
        setClickedIcon(null);
        setClickedColor(null);
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
  const onIconPress = (iconObj: {name: string; type: string}) => {
    setIconToAdd(iconObj);
    setClickedIcon(iconObj.name);
  };

  const clearIcon = () => {
    setIconToAdd(null);
    setClickedIcon(null);
  };

  return (
    <Dialog isVisible={open} onBackdropPress={onBackPress}>
      <Dialog.Title title={`Add ${titleCat}`} />
      <View style={styles.seconsdaryContanier}>
        <Input
          inputContainerStyle={styles.input}
          labelStyle={styles.label}
          label={`${titleCat} name`}
          placeholder={isSubCategory ? 'Groceries' : 'Home'}
          onChangeText={setCategoryName}
          value={categoryName}
        />
      </View>
      <IconsForm
        clearChoice={clearIcon}
        titleCat={titleCat}
        onIconPress={onIconPress}
        clickedChoice={clickedIcon}
      />
      <ColorsForm
        clearChoice={() => setClickedColor(null)}
        titleCat={titleCat}
        onColorPress={(color: string) => setClickedColor(color)}
        clickedChoice={clickedColor}
      />
      <Dialog.Actions>
        <Dialog.Button title="Cancel" onPress={onBackPress} />
        <Dialog.Button title="Submit" onPress={onSubmit} />
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  label: {color: 'white', marginBottom: 10},

  seconsdaryContanier: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: 'white',
  },
});
