import {screens} from './types';

export interface HeaderProps {
  openDrawer: () => void;
}

export interface TasksProps {
  tasks: ITask[];
}

export interface CategoriesProps {
  category: ICategory;
}

export interface ITask {
  id: number;
  description: string;
  category: string;
}

export interface GeneralCategory {
  id: number;
  name: string;
}

export interface ISubCategory extends GeneralCategory {}

export interface ICategory extends GeneralCategory {
  subCategories: ISubCategory[];
}

export interface DrawerContentProps {
  screenChanger: (screenName: screens) => void;
  closeDrawer: () => void;
}
