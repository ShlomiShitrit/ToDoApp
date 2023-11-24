import {IUser, ITask, ICategory} from '../general/interfaces';

export const EMPTY_USER: IUser = {
  userId: 0,
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const EMPTY_CATEGORY: ICategory = {
  id: 0,
  name: ' Test category',
};

export const EMPTY_TASKS: ITask[] = [
  {
    id: 0,
    title: 'Task 1',
    subTitle: 'Sub title 1',
  },
  {
    id: 1,
    title: 'Task 2',
    subTitle: 'Sub title 2',
  },
  {
    id: 2,
    title: 'Task 3',
    subTitle: 'Sub title 3',
  },
];
