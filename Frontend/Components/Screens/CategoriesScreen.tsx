import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text, Icon, Button} from '@rneui/themed';
import Tasks from '../Tasks/Tasks';
import {CategoryScreenProps} from '../../general/interfaces';
import AddTaskDialog from '../Dialogs/AddTaskDialog';

const windowHeight = Dimensions.get('window').height;

export default function CategoriesScreen({
  category,
  isSubCategory,
}: CategoryScreenProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [iaEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text h2 h2Style={styles.text}>
        {category?.name}
      </Text>
      <View style={styles.iconscontainer}>
        <Icon
          style={styles.plusIcon}
          onPress={() => setOpen(true)}
          name="plus"
          type="ant-design"
        />
        <Button
          size="sm"
          containerStyle={styles.button}
          title="Edit mode"
          titleStyle={styles.buttonTitle}
          onPress={() => setIsEditMode(!iaEditMode)}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Tasks
          isUpdate={isUpdate}
          category={category}
          isSubCategory={isSubCategory}
          isEditMode={iaEditMode}
          onUpdate={() => setIsUpdate(!isUpdate)}
        />
        <AddTaskDialog
          open={open}
          onBackPress={() => setOpen(false)}
          onUpdate={() => setIsUpdate(!isUpdate)}
          category={category}
          isSubCategory={isSubCategory}
          method={'POST'}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.8,
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: '10%',
    paddingHorizontal: '10%',
  },
  list: {
    flexGrow: 1,
    paddingTop: '10%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    marginTop: '10%',
    marginBottom: '20%',
  },
  iconscontainer: {
    flexDirection: 'row',
  },
  plusIcon: {},
  button: {
    marginLeft: '75%',
    borderRadius: 20,
  },
  buttonTitle: {
    fontSize: 13,
    color: 'white',
  },
});
