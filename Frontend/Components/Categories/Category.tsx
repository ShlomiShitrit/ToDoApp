import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '@rneui/themed';
import {CategoriesProps, ICategory} from '../../general/interfaces';

export default function Category({category}: CategoriesProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.173:8080/api/Category/${category?.id}/subcategories`,
        );
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubCategories();
  }, [category]);

  return (
    <ListItem.Accordion
      containerStyle={styles.listItem}
      key={category?.id}
      content={
        <ListItem.Content>
          <ListItem.Title style={styles.listTitle}>
            {category?.name}
          </ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}>
      {subCategories
        ? subCategories?.map(sub => (
            <ListItem key={sub?.id} containerStyle={styles.subListItem}>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {sub?.name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        : null}
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderTopWidth: 0, // Remove top border
    borderBottomWidth: 1,
  },
  subListItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    marginLeft: 30,
    paddingTop: 8, // Adjust padding top for sub items
    paddingBottom: 8, // Adjust padding bottom for sub items
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20, // Add a border at the bottom
  },
  subListTitle: {
    color: 'white',
    fontSize: 14, // Reduce font size for sub items
  },
});
