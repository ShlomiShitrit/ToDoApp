import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import Category from './Category';
import {ICategory} from '../../general/interfaces';
import {EMPTY_CATEGORIES} from '../../general/resources';

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    setCategories(EMPTY_CATEGORIES);
    // TODO: Fetch categories from API
    // fetch('')
    //   .then(response => response.json())
    //   .then(data => setCategories(data));
  }, []);

  return (
    <ListItem.Accordion
      containerStyle={styles.listItem}
      content={
        <>
          <Icon style={styles.icon} name="layer-group" type="font-awesome-5" />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>Categories</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}>
      {categories?.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 15,
  },
});
