import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '@rneui/themed';
import {CategoryProps, ICategory} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import {API_HOST} from '@env';

export default function Category({
  category,
  setCurrentCategory,
  setIsSubCategory,
  setCurrentScreen,
}: CategoryProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);

  const userToken = useAppSelector(state => state.user.token);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          `${API_HOST}api/Category/${category?.id}/subcategories`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubCategories();
  }, [category, userToken]);

  const clickCategoryHandler = (
    clickedCategory: ICategory,
    isSub: boolean = false,
  ) => {
    if (!isSub) {
      setExpanded(!expanded);
      setIsSubCategory(false);
    } else {
      setIsSubCategory(true);
    }
    console.log(clickedCategory);

    setCurrentCategory(clickedCategory);
    setCurrentScreen('Categories');
  };

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
      onPress={() => clickCategoryHandler(category)}
      noIcon={true}>
      {subCategories
        ? subCategories?.map(sub => (
            <ListItem
              key={sub?.id}
              containerStyle={styles.subListItem}
              onPress={() => clickCategoryHandler(sub, true)}>
              <ListItem.Content>
                <ListItem.Title style={styles.subListTitle}>
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
    padding: 25,
  },
  subListItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15, // Add a border at the bottom
    position: 'absolute',
    right: 0,
  },
  subListTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    marginRight: 55,
    right: 0,
  },
});
