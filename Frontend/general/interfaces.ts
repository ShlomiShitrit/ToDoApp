import {screens, categoryIcon, direction, language} from './types';

export interface HeaderProps {
  openDrawer: () => void;
}

export interface TasksProps extends CategoryScreenProps {
  tasks: ITask[];
}

export interface GeneralCategoryProp {
  category: ICategory;
}

export interface CategoryUpdateProps {
  onUpdate: () => void;
  isUpdate: boolean;
}

export interface CategoryProps
  extends DrawerCategoriesProps,
    GeneralCategoryProp,
    CategoryUpdateProps {}

export interface CategoryScreenProps extends GeneralCategoryProp {
  isSubCategory: boolean;
}

export interface DrawerCategoriesGeneralProps {
  setCurrentCategory: (category: ICategory) => void;
  setIsSubCategory: (isSubCategory: boolean) => void;
  isSubCategory: boolean;
}

export interface EditCategoryProps
  extends DrawerCategoriesGeneralProps,
    CategoryUpdateProps,
    GeneralCategoryProp {}

export interface EditCategoriesProps extends DrawerCategoriesGeneralProps {}

export interface DrawerCategoriesProps extends DrawerCategoriesGeneralProps {
  screenChanger: (screenName: screens, isSub?: boolean) => void;
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
  iconName: string;
  iconType: string;
  colorHash: string;
}

export interface ISubCategory extends GeneralCategory {}

export interface ICategory extends GeneralCategory {
  subCategories?: ISubCategory[];
  categoryId?: number;
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
  userId: string;
}

export interface IconColorFormGeneral {
  clearChoice: () => void;
  titleCat: string;
  clickedChoice: string | null;
}

export interface IconFormProps extends IconColorFormGeneral {
  onIconPress: (iconObj: categoryIcon) => void;
}

export interface ColorFormProps extends IconColorFormGeneral {
  onColorPress: (color: string) => void;
}
interface DirProp {
  dir: direction;
}

interface IsSubProp {
  isSubCategory: boolean;
}

export interface EditCategoryIconsProps
  extends DirProp,
    IsSubProp,
    GeneralCategoryProp {}

export interface EditCategoryAccordionContentProps extends GeneralCategoryProp {
  dir: direction;
}

export interface LocaleSliceState {
  dir: direction;
  lang: language;
}

export interface EditSubCategoriesContentProps
  extends DirProp,
    GeneralCategoryProp {}

export interface AddSubCategoryContentProps extends DirProp {
  setOpen: () => void;
}

export interface EditCategoriesAccordionContentProps extends DirProp {}

export interface AddCategoryContentProps extends AddSubCategoryContentProps {}

export interface UpdateCategoryProps {
  category: ICategory;
  isSubCategory: boolean;
  open: boolean;
  onBackPress: () => void;
}
