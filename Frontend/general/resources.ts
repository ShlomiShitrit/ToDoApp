import {IUser} from '../general/interfaces';

export const EMPTY_USER: IUser = {
  userId: 0,
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const EMPTY_WEEKLY_TASKS = [
  {
    id: 0,
    title: 'test 1',
    subTitle: 'sub test 1',
    checked: false,
  },
  {
    id: 1,
    title: 'test 2',
    subTitle: 'sub test 2',
    checked: false,
  },
  {
    id: 3,
    title: 'test 3',
    subTitle: 'sub test 3',
    checked: false,
  },
];
