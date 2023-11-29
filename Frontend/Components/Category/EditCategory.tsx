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
import {getSubCategories} from '../../general/api';

export default function Category({
  category,
  isSubCategory,
  onUpdate,
  setIsSubCategory,
  isUpdate,
}: EditCategoryProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const {dir} = useLang();

  const userToken = useAppSelector(state => state.user.token);

  useEffect(() => {
    getSubCategories(category, userToken, setSubCategories);
  }, [category, userToken, isUpdate]);

  const clickCategoryHandler = (isSub: boolean = false) => {
    if (!isSub) {
      setExpanded(!expanded);
      setIsSubCategory(false);
    } else {
      setIsSubCategory(true);
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
            <EditCategoryAccordionContent
              dir={dir}
              category={category}
              onUpdate={onUpdate}
            />
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => clickCategoryHandler()}
        noIcon={true}>
        {Array.isArray(subCategories) &&
        subCategories.length > 0 &&
        subCategories
          ? subCategories?.map(sub => (
              <ListItem
                key={sub?.id}
                containerStyle={[
                  styles.subListItem,
                  {backgroundColor: sub?.colorHash},
                ]}
                onPress={() => clickCategoryHandler(true)}>
                <EditSubCategoriesContent
                  dir={dir}
                  category={sub}
                  onUpdate={onUpdate}
                />
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
