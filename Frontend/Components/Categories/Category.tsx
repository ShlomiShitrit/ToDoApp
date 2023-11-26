import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {CategoryProps, ICategory} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import useLang from '../../hooks/useLang';
import AddCategoryDialog from '../Forms/AddCategoryDialog';
import {API_HOST} from '@env';

export default function Category({
  category,
  setCurrentCategory,
  setIsSubCategory,
  screenChanger,
  isSubCategory,
}: CategoryProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const {dir} = useLang();

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
      setCurrentCategory(clickedCategory);
      screenChanger('Categories');
    } else {
      setIsSubCategory(true);
      setCurrentCategory(clickedCategory);
      screenChanger('Categories', true);
    }
  };

  return (
    <>
      <ListItem.Accordion
        containerStyle={styles.listItem}
        key={category?.id}
        content={
          <ListItem.Content>
            <ListItem.Title
              style={dir === 'rtl' ? styles.listTitleRtl : styles.listTitleLtr}>
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
                  <ListItem.Title
                    style={
                      dir === 'rtl'
                        ? styles.subListTitleRtl
                        : styles.subListTitleLtr
                    }>
                    {sub?.name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          : null}
        <ListItem containerStyle={styles.addSubListItem}>
          <ListItem.Content>
            <View
              style={
                dir === 'rtl' ? styles.rowContainerRtl : styles.rowContainerLtr
              }>
              {dir === 'ltr' ? <Icon name="plus" type="ant-design" /> : null}
              <ListItem.Title
                style={
                  dir === 'rtl'
                    ? styles.addSubListTitleRtl
                    : styles.addSubListTitleLtr
                }
                onPress={() => setOpen(true)}>
                Add subcategory
              </ListItem.Title>
              {dir === 'rtl' ? <Icon name="plus" type="ant-design" /> : null}
            </View>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
      <AddCategoryDialog
        open={open}
        onBackPress={() => setOpen(false)}
        isSubCategory={isSubCategory}
        category={category}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    padding: 25,
  },
  subListItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  listTitleRtl: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
    position: 'absolute',
    right: 0,
  },
  listTitleLtr: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    position: 'absolute',
    left: 0,
  },
  subListTitleRtl: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    marginRight: 55,
    right: 0,
  },
  subListTitleLtr: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    marginLeft: 55,
    left: 0,
  },
  addSubListItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 20,
  },
  addSubListTitleRtl: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addSubListTitleLtr: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowContainerRtl: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
  rowContainerLtr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
