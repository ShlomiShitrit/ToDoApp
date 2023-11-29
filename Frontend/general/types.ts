import {ICategory, ITask} from './interfaces';

export type screens = 'Home' | 'User' | 'Categories' | 'Login' | 'Settings';

export type categoryIcon = {name: string; type: string};

export type direction = 'rtl' | 'ltr';
export type language = 'en' | 'he';
export type postOrUpdateTask = 'POST' | 'PUT';

export type createCategoryOrSubObjCallback = {
  setCategoryName: Function;
  setClickedIcon: Function;
  setClickedColor: Function;
  onUpdate: Function;
  onBackPress: Function;
};

export type createTaskObjCallback = {
  setTaskTitle: Function;
  setTaskSubTitle: Function;
  onUpdate: Function;
  onBackPress: Function;
};

export type categoryToPostObj = {
  name: string;
  iconName: string | undefined;
  iconType: string | undefined;
  colorHash: string | null;
};

export type postOrPutTaskObj = {
  isSubCategory: boolean;
  category: ICategory | undefined;
  userToken: string;
  task: ITask | undefined;
  method: postOrUpdateTask;
};

export type createTaskDataObj = {
  taskTitle: string;
  taskSubTitle: string;
};
