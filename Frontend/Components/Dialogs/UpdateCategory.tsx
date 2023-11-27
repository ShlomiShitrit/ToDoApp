import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Dialog} from '@rneui/themed';
import IconsForm from '../Forms/IconsForm';
import ColorsForm from '../Forms/ColorsForm';
import {categoryIcon} from '../../general/types';
import {useAppSelector} from '../../hooks/store';
import {UpdateCategoryProps} from '../../general/interfaces';
import {API_HOST} from '@env';

export default function UpdateCategory({
  open,
  onBackPress,
  isSubCategory,
  category,
}: UpdateCategoryProps): JSX.Element {
  const [categoryName, setCategoryName] = useState<string>('');
  const [iconToAdd, setIconToAdd] = useState<categoryIcon | null>();
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);
  const [clickedColor, setClickedColor] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(0);

  const userToken = useAppSelector(state => state.user.token);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`${API_HOST}api/User/userinfo`, {
          headers: {Authorization: `Bearer ${userToken}`},
        });
        const userInfo = await response.json();
        setUserId(userInfo.id);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [userToken]);

  const editHandler = async () => {
    const categoryToPut = {
      id: category?.id,
      name: categoryName,
      iconName: iconToAdd?.name,
      iconType: iconToAdd?.type,
      colorHash: clickedColor,
    };

    const isSubUrl = isSubCategory
      ? `SubCategory/${category?.id}?categoryId=${category.categoryId}`
      : `Category/${category?.id}?userId=${userId}`;
    const url = `${API_HOST}api/${isSubUrl}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(categoryToPut),
      });
      if (response.ok) {
        console.log('Edited');
        setCategoryName('');
        setClickedIcon(null);
        setClickedColor(null);
        onBackPress();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const titleCat = isSubCategory ? 'subcategory' : 'category';

  const onIconPress = (iconObj: {name: string; type: string}) => {
    setIconToAdd(iconObj);
    setClickedIcon(iconObj.name);
  };

  const clearIcon = () => {
    setIconToAdd(null);
    setClickedIcon(null);
  };
  return (
    <Dialog
      style={styles.dialog}
      isVisible={open}
      onBackdropPress={onBackPress}>
      <Dialog.Title title={`Update ${titleCat}`} />
      <View style={styles.seconsdaryContanier}>
        <Input
          inputContainerStyle={styles.input}
          labelStyle={styles.label}
          label="Category Name"
          placeholder="Name"
          value={categoryName}
          onChangeText={setCategoryName}
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
        <Dialog.Button title="Submit" onPress={editHandler} />
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
  dialog: {
    zIndex: 1000,
  },
});
