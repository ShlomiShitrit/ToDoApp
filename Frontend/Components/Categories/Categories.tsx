import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import Category from './Category';
import {ICategory, CategoriesProps} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import useLang from '../../hooks/useLang';
import {API_HOST} from '@env';

export default function Categories({
  setCurrentCategory,
  setIsSubCategory,
  screenChanger,
}: CategoriesProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const {dir} = useLang();

  const userToken = useAppSelector(state => state.user.token);
  const isLoggedIn = useAppSelector(state => state.user.loggedIn);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_HOST}api/User/categories`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [userToken]);

  return (
    <>
      <ListItem.Accordion
        containerStyle={styles.listItem}
        content={
          <>
            <ListItem.Content
              style={dir === 'rtl' ? styles.contentRtl : styles.contentLtr}>
              {dir === 'ltr' ? (
                <Icon
                  style={styles.icon}
                  name="layer-group"
                  type="font-awesome-5"
                />
              ) : null}
              <ListItem.Title style={styles.listTitle}>
                Categories
              </ListItem.Title>
              {dir === 'rtl' ? (
                <Icon
                  style={styles.icon}
                  name="layer-group"
                  type="font-awesome-5"
                />
              ) : null}
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
        noIcon={true}>
        {categories.map !== undefined && isLoggedIn
          ? categories?.map((category, index) => (
              <Category
                key={index}
                category={category}
                setCurrentCategory={setCurrentCategory}
                setIsSubCategory={setIsSubCategory}
                screenChanger={screenChanger}
              />
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
    padding: 30,
  },
  contentRtl: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  contentLtr: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 15,
    marginRight: 15,
  },
});
