import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import Category from './Category';
import {ICategory} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const userId = useAppSelector(state => state.user.userId);
  const isLoggedIn = useAppSelector(state => state.user.loggedIn);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.173:8080/api/User/${userId}/categories`,
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [userId]);

  return (
    <>
      <ListItem.Accordion
        containerStyle={styles.listItem}
        content={
          <>
            <Icon
              style={styles.icon}
              name="layer-group"
              type="font-awesome-5"
            />
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>
                Categories
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}>
        {categories.map !== undefined && isLoggedIn
          ? categories?.map((category, index) => (
              <Category key={index} category={category} />
            ))
          : null}
      </ListItem.Accordion>
    </>
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
