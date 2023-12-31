import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {CategoryProps, ICategory} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import useLang from '../../hooks/useLang';
import AddCategoryDialog from '../Dialogs/AddCategoryDialog';
import {getSubCategories} from '../../general/api';

export default function Category({
  category,
  setCurrentCategory,
  setIsSubCategory,
  screenChanger,
  isSubCategory,
  onUpdate,
  isUpdate,
}: CategoryProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const {dir} = useLang();

  const userToken = useAppSelector(state => state.user.token);

  useEffect(() => {
    getSubCategories(category, userToken, setSubCategories);
  }, [category, userToken, isUpdate]);

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
        containerStyle={[
          styles.listItem,
          {backgroundColor: category?.colorHash},
        ]}
        key={category?.id}
        content={
          <ListItem.Content>
            <View
              style={
                dir === 'rtl' ? styles.rowContainerRtl : styles.rowContainerLtr
              }>
              {dir === 'ltr' ? (
                <Icon name={category?.iconName} type={category?.iconType} />
              ) : null}
              <ListItem.Title
                style={
                  dir === 'rtl' ? styles.listTitleRtl : styles.listTitleLtr
                }>
                {category?.name}
              </ListItem.Title>
              {dir === 'rtl' ? (
                <Icon name={category?.iconName} type={category?.iconType} />
              ) : null}
            </View>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => clickCategoryHandler(category)}
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
                onPress={() => clickCategoryHandler(sub, true)}>
                <ListItem.Content>
                  <View
                    style={
                      dir === 'rtl'
                        ? styles.rowContainerSubRtl
                        : styles.rowContainerSubLtr
                    }>
                    {dir === 'ltr' ? (
                      <Icon name={sub?.iconName} type={sub?.iconType} />
                    ) : null}
                    <ListItem.Title
                      style={
                        dir === 'rtl'
                          ? styles.subListTitleRtl
                          : styles.subListTitleLtr
                      }>
                      {sub?.name}
                    </ListItem.Title>
                    {dir === 'rtl' ? (
                      <Icon name={sub?.iconName} type={sub?.iconType} />
                    ) : null}
                  </View>
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
  listTitleRtl: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  listTitleLtr: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subListTitleRtl: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subListTitleLtr: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
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
  rowContainerSubRtl: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: 60,
  },
  rowContainerSubLtr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
