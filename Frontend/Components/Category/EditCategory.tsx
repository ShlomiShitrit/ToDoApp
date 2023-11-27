import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '@rneui/themed';
import {ICategory, EditCategoryProps} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import useLang from '../../hooks/useLang';
import AddCategoryDialog from '../Dialogs/AddCategoryDialog';
import EditCategoryAccordionContent from './EditCategoryAccordionContent';
import EditSubCategoriesContent from '../Categories/EditSubCategoriesContent';
import AddSubCategoryContent from './AddSubCategoryContent';
import {API_HOST} from '@env';

export default function Category({
  category,
  isSubCategory,
  onUpdate,
  setCurrentCategory,
  setIsSubCategory,
  isUpdate,
}: EditCategoryProps): JSX.Element {
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
  }, [category, userToken, isUpdate]);

  const clickCategoryHandler = (
    clickedCategory: ICategory,
    isSub: boolean = false,
  ) => {
    if (!isSub) {
      setExpanded(!expanded);
      setIsSubCategory(false);
      setCurrentCategory(clickedCategory);
    } else {
      setIsSubCategory(true);
      setCurrentCategory(clickedCategory);
    }
  };

  return (
    <>
      <ListItem.Accordion
        containerStyle={[
          styles.listItem,
          {backgroundColor: category?.colorHash},
        ]}
        key={category?.id}
        content={
          <ListItem.Content>
            <EditCategoryAccordionContent dir={dir} category={category} />
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => clickCategoryHandler(category)}
        noIcon={true}>
        {subCategories
          ? subCategories?.map(sub => (
              <ListItem
                key={sub?.id}
                containerStyle={[
                  styles.subListItem,
                  {backgroundColor: sub?.colorHash},
                ]}
                onPress={() => clickCategoryHandler(sub, true)}>
                <EditSubCategoriesContent dir={dir} category={sub} />
              </ListItem>
            ))
          : null}
        <ListItem containerStyle={styles.addSubListItem}>
          <AddSubCategoryContent dir={dir} setOpen={() => setOpen(true)} />
        </ListItem>
      </ListItem.Accordion>
      <AddCategoryDialog
        open={open}
        onBackPress={() => setOpen(false)}
        isSubCategory={isSubCategory}
        category={category}
        onUpdate={onUpdate}
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

  addSubListItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 20,
  },
});
