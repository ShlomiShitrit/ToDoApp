import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import EditCategories from '../Categories/EditCategories';

export default function UserScreen(): JSX.Element {
  const [isSubCategory, setIsSubCategory] = useState<boolean>(false);

  return (
    <ScrollView style={styles.container}>
      <EditCategories
        isSubCategory={isSubCategory}
        setIsSubCategory={(value: boolean) => setIsSubCategory(value)}
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
