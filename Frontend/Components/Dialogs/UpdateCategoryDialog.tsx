import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Dialog} from '@rneui/themed';
import IconsForm from '../Forms/IconsForm';
import ColorsForm from '../Forms/ColorsForm';
import {
  categoryIcon,
  createCategoryOrSubObjCallback,
} from '../../general/types';
import {useAppSelector} from '../../hooks/store';
import {UpdateCategoryProps} from '../../general/interfaces';
import {getUserInfo, updateCategory} from '../../general/api';

export default function UpdateCategoryDialog({
  open,
  onBackPress,
  isSubCategory,
  category,
  onUpdate,
}: UpdateCategoryProps): JSX.Element {
  const [categoryName, setCategoryName] = useState<string>('');
  const [iconToAdd, setIconToAdd] = useState<categoryIcon | null>();
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);
  const [clickedColor, setClickedColor] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(0);

  const userToken = useAppSelector(state => state.user.token);

  useEffect(() => {
    getUserInfo(userToken, setUserId);
  }, [userToken]);

  const titleCat = isSubCategory ? 'subcategory' : 'category';

  const onIconPress = (iconObj: {name: string; type: string}) => {
    setIconToAdd(iconObj);
    setClickedIcon(iconObj.name);
  };

  const clearIcon = () => {
    setIconToAdd(null);
    setClickedIcon(null);
  };

  const callbackObj: createCategoryOrSubObjCallback = {
    setCategoryName,
    setClickedIcon,
    setClickedColor,
    onUpdate,
    onBackPress,
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
        <Dialog.Button
          title="Submit"
          onPress={() =>
            updateCategory(
              callbackObj,
              category,
              categoryName,
              iconToAdd,
              clickedColor,
              isSubCategory,
              userId,
              userToken,
            )
          }
        />
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
