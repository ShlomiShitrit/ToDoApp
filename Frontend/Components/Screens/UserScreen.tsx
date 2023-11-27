import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {ICategory} from '../../general/interfaces';
import EditCategories from '../Categories/EditCategories';

export default function UserScreen(): JSX.Element {
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null,
  );
  const [isSubCategory, setIsSubCategory] = useState<boolean>(false);
  console.log(currentCategory);

  return (
    <ScrollView style={styles.container}>
      <EditCategories
        isSubCategory={isSubCategory}
        setIsSubCategory={(value: boolean) => setIsSubCategory(value)}
        setCurrentCategory={(category: ICategory) =>
          setCurrentCategory(category)
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginHorizontal: '10%',
    position: 'absolute',
    top: '15%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
