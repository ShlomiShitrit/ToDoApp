import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '@rneui/themed';
import EditCategory from '../Category/EditCategory';
import {ICategory, EditCategoriesProps} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import useLang from '../../hooks/useLang';
import {API_HOST} from '@env';
import AddCategoryDialog from '../Dialogs/AddCategoryDialog';
import EditCategoriesAccordionContent from './EditCategoriesAccordionContent';
import AddCategoriesContent from './AddCategoriesContent';

export default function EditCategories({
  isSubCategory,
  setIsSubCategory,
}: EditCategoriesProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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
  }, [userToken, isUpdate, isUpdate]);

  return (
    <>
      <ListItem.Accordion
        containerStyle={styles.listItem}
        content={<EditCategoriesAccordionContent dir={dir} />}
        isExpanded={expanded}
        onPress={() => setExpanded(!expanded)}
        noIcon={true}>
        {categories.map !== undefined && isLoggedIn
          ? categories?.map((category, index) => (
              <EditCategory
                key={index}
                category={category}
                isSubCategory={true}
                setIsSubCategory={setIsSubCategory}
                onUpdate={() => setIsUpdate(!isUpdate)}
                isUpdate={isUpdate}
              />
            ))
          : null}
        <ListItem containerStyle={styles.listItem}>
          <AddCategoriesContent dir={dir} setOpen={() => setOpen(true)} />
        </ListItem>
      </ListItem.Accordion>
      <AddCategoryDialog
        open={open}
        onBackPress={() => setOpen(false)}
        isSubCategory={isSubCategory}
        onUpdate={() => setIsUpdate(!isUpdate)}
      />
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
});
