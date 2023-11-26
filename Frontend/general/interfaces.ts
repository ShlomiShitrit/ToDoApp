import {screens} from './types';

export interface HeaderProps {
  openDrawer: () => void;
}

export interface TasksProps extends CategoryScreenProps {
  tasks: ITask[];
}

export interface GeneralCategoryProp {
  category: ICategory;
}

export interface CategoryProps
  extends DrawerCategoriesProps,
    GeneralCategoryProp {
  onUpdate: () => void;
  isUpdate: boolean;
}

export interface CategoryScreenProps extends GeneralCategoryProp {
  isSubCategory: boolean;
}

export interface DrawerCategoriesProps {
  setCurrentCategory: (category: ICategory) => void;
  setIsSubCategory: (isSubCategory: boolean) => void;
  screenChanger: (screenName: screens, isSub?: boolean) => void;
  isSubCategory: boolean;
}

export interface CategoriesProps extends DrawerCategoriesProps {}

export interface DrawerContentProps extends DrawerCategoriesProps {
  closeDrawer: () => void;
}

export interface ITask {
  id: number;
  title: string;
  subTitle: string;
  checked: boolean;
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

export interface GeneralDialog {
  open: boolean;
  onBackPress: () => void;
}

export interface AdvancedDialogProps extends GeneralDialog {
  isSubCategory: boolean;
  onUpdate: () => void;
  category?: ICategory;
}

export interface SignupDialogProps extends GeneralDialog {}

export interface AddTaskDialogProps extends AdvancedDialogProps {}

export interface AddCategoryDialogProps extends AdvancedDialogProps {}

export interface UserSliceState {
  userInfo: IUser;
  token: string;
  loggedIn: boolean;
}
