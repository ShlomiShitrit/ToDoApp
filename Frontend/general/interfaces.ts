import {screens} from './types';

export interface HeaderProps {
  openDrawer: () => void;
}

export interface TasksProps {
  tasks: ITask[];
}

export interface GeneralCategoryProp {
  category: ICategory;
}

export interface CategoryProps extends CategoriesProps, GeneralCategoryProp {}

export interface CategoryScreenProps extends GeneralCategoryProp {
  isSubCategory: boolean;
}

export interface CategoriesProps {
  setCurrentCategory: (category: ICategory) => void;
  setIsSubCategory: (isSubCategory: boolean) => void;
  screenChanger: (screenName: screens, isSub?: boolean) => void;
}

export interface ITask {
  id: number;
  title: string;
  subTitle: string;
}

export interface IUser {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupFormProps {
  dataHandler: (data: IUser) => void;
}

export interface GeneralCategory {
  id: number;
  name: string;
}

export interface ISubCategory extends GeneralCategory {}

export interface ICategory extends GeneralCategory {
  subCategories?: ISubCategory[];
}

export interface DrawerContentProps {
  screenChanger: (screenName: screens) => void;
  closeDrawer: () => void;
  setCurrentCategory: (category: ICategory) => void;
  setIsSubCategory: (isSubCategory: boolean) => void;
}

export interface SignupDialogProps {
  open: boolean;
  onBackPress: () => void;
}

export interface UserSliceState {
  userInfo: IUser;
  token: string;
  loggedIn: boolean;
}
