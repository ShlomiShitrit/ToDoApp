import {screens, categoryIcon, direction, language} from './types';

export interface HeaderProps {
  openDrawer: () => void;
}

export interface TasksProps extends CategoryScreenProps {
  tasks: ITask[];
  isEditMode: boolean;
  onUpdate: () => void;
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

export interface IsSubProps {
  setIsSubCategory: (isSubCategory: boolean) => void;
  isSubCategory: boolean;
}

export interface DrawerCategoriesGeneralProps extends IsSubProps {
  setCurrentCategory: (category: ICategory) => void;
}

export interface EditCategoryProps
  extends IsSubProps,
    CategoryUpdateProps,
    GeneralCategoryProp {}

export interface EditCategoriesProps extends IsSubProps {}

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
  categoryId?: number;
  subCategoryId?: number;
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

export interface AddTaskDialogProps extends AdvancedDialogProps {
  method: 'POST' | 'PUT';
  task?: ITask;
}

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

interface OnUpdateProp {
  onUpdate: () => void;
}

export interface EditCategoryIconsProps
  extends DirProp,
    IsSubProp,
    GeneralCategoryProp,
    OnUpdateProp {}

export interface EditCategoryAccordionContentProps
  extends GeneralCategoryProp,
    OnUpdateProp {
  dir: direction;
}

export interface LocaleSliceState {
  dir: direction;
  lang: language;
}

export interface EditSubCategoriesContentProps
  extends DirProp,
    GeneralCategoryProp,
    OnUpdateProp {}

export interface AddSubCategoryContentProps extends DirProp {
  setOpen: () => void;
}

export interface EditCategoriesAccordionContentProps extends DirProp {}

export interface AddCategoryContentProps extends AddSubCategoryContentProps {}

export interface UpdateCategoryProps extends OnUpdateProp {
  category: ICategory;
  isSubCategory: boolean;
  open: boolean;
  onBackPress: () => void;
}

export interface DeleteCategoryDialogProps {
  open: boolean;
  onBackPress: () => void;
  editHandler: () => void;
}
