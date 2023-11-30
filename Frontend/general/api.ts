import {ITask, ICategory, IUser} from './interfaces';
import {
  categoryIcon,
  createCategoryOrSubObjCallback,
  categoryToPostObj,
  createTaskObjCallback,
  postOrPutTaskObj,
  createTaskDataObj,
} from './types';
import {API_HOST} from '@env';

export async function getSubCategories(
  category: ICategory,
  userToken: string,
  callback: Function,
) {
  try {
    const response = await fetch(
      `${API_HOST}api/Category/${category?.id}/subcategories`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories(userToken: string, callback: Function) {
  try {
    const response = await fetch(`${API_HOST}api/User/categories`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCategoryOrSub(
  isSubCategory: boolean,
  category: ICategory,
  userToken: string,
  setOpenDelete: Function,
  onUpdate: Function,
) {
  const url = isSubCategory ? 'SubCategory' : 'Category';

  try {
    const taskResponse = await fetch(
      `${API_HOST}api/${url}/${category?.id}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );

    const taskData = await taskResponse.json();
    taskData.forEach(async (task: ITask) => {
      try {
        const response = await fetch(`${API_HOST}api/Task/${task?.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await fetch(`${API_HOST}api/${url}/${category?.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.ok) {
      setOpenDelete(false);
      onUpdate();
      console.log('Deleted');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createCategoryOrSub(
  userToken: string,
  isSubCategory: boolean,
  category: ICategory | undefined,
  titleCat: string,
  callBackObj: createCategoryOrSubObjCallback,
  categoryToPost: categoryToPostObj,
) {
  const url = isSubCategory ? `SubCategory/${category?.id}` : 'Category';

  try {
    const response = await fetch(`${API_HOST}api/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(categoryToPost),
    });

    if (response.ok) {
      console.log(`${titleCat} added successfully`);
      callBackObj.setCategoryName('');
      callBackObj.setClickedIcon(null);
      callBackObj.setClickedColor(null);
      callBackObj.onUpdate();
      callBackObj.onBackPress();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    console.log(`Error adding ${titleCat}: `);
    console.log(error);
  }
}

export async function createTask(
  dataObj: postOrPutTaskObj,
  taskDataObj: createTaskDataObj,
  callBackObj: createTaskObjCallback,
) {
  const catUrl = dataObj.isSubCategory
    ? `subcategory?subCategoryId=${dataObj.category?.id}`
    : `category?categoryId=${dataObj.category?.id}`;
  const url =
    dataObj.method === 'POST' ? `Task/${catUrl}` : `Task/${dataObj.task?.id}`;
  const taskObj =
    dataObj.method === 'POST'
      ? {
          title: taskDataObj.taskTitle,
          subTitle: taskDataObj.taskSubTitle,
          date: taskDataObj.taskDate,
        }
      : {
          id: dataObj.task?.id,
          title: taskDataObj.taskTitle,
          subTitle: taskDataObj.taskSubTitle,
          checked: dataObj.task?.checked,
          date: taskDataObj.taskDate,
          categoryId: dataObj.task?.categoryId,
          subCategoryId: dataObj.task?.subCategoryId,
        };
  try {
    const response = await fetch(`${API_HOST}api/${url}`, {
      method: dataObj.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dataObj.userToken}`,
      },
      body: JSON.stringify(taskObj),
    });

    if (response.ok) {
      console.log('Task added successfully');
      callBackObj.setTaskTitle('');
      callBackObj.setTaskSubTitle('');
      callBackObj.onUpdate();
      callBackObj.onBackPress();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    console.log('Error adding task: ');
    console.log(error);
  }
}

export async function signupUser(data: IUser, onBackPress: Function) {
  try {
    const response = await fetch(`${API_HOST}api/User`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorResData = await response.json();
      throw new Error(errorResData.message || 'Something went wrong');
    } else {
      const resData = response.json();
      console.log(resData);
    }
  } catch (error) {
    console.log(error);
  }
  onBackPress();
}

export async function getUserInfo(userToken: string, callback: Function) {
  try {
    const response = await fetch(`${API_HOST}api/User/userinfo`, {
      headers: {Authorization: `Bearer ${userToken}`},
    });
    if (response.ok) {
      const userInfo = await response.json();
      callback(userInfo.id);
    } else {
      const errorResData = await response.json();
      throw new Error(errorResData.message || 'Something went wrong');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfoAfterLogin(
  userToken: string,
  dispatchUser: Function,
  dispatchUserId: Function,
) {
  try {
    const response = await fetch(`${API_HOST}api/User/userinfo`, {
      headers: {Authorization: `Bearer ${userToken}`},
    });
    const userInfo = await response.json();
    dispatchUser(userInfo);
    dispatchUserId(userInfo.id);
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategory(
  callbackObj: createCategoryOrSubObjCallback,
  category: ICategory | undefined,
  categoryName: string,
  iconToAdd: categoryIcon | undefined | null,
  clickedColor: string | null,
  isSubCategory: boolean,
  userId: number,
  userToken: string,
) {
  const categoryToPut = {
    id: category?.id,
    name: categoryName,
    iconName: iconToAdd?.name,
    iconType: iconToAdd?.type,
    colorHash: clickedColor,
  };

  const isSubUrl = isSubCategory
    ? `SubCategory/${category?.id}?categoryId=${category?.categoryId}`
    : `Category/${category?.id}?userId=${userId}`;
  const url = `${API_HOST}api/${isSubUrl}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(categoryToPut),
    });
    if (response.ok) {
      console.log('Edited');
      callbackObj.setCategoryName('');
      callbackObj.setClickedIcon(null);
      callbackObj.setClickedColor(null);
      callbackObj.onUpdate();
      callbackObj.onBackPress();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(
  email: string,
  password: string,
  dispatchToken: Function,
  dispatchLoggedIn: Function,
) {
  try {
    const response = await fetch(`${API_HOST}api/Auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });

    if (response.ok) {
      const token = await response.text();
      dispatchToken(token);
      dispatchLoggedIn(true);
    } else {
      const errorResData = await response.json();
      throw new Error(errorResData.message || 'Something went wrong');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getTasks(
  category: ICategory,
  userToken: string,
  isSubCategory: boolean,
  callback: Function,
) {
  try {
    const url = isSubCategory
      ? `SubCategory/${category?.id}/tasks`
      : `Category/${category?.id}/tasks`;
    const response = await fetch(`${API_HOST}api/` + url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      data.reverse();
      callback(data);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkTask(
  task: ITask,
  tasks: ITask[],
  callback: Function,
  isSubCategory: boolean,
  category: ICategory | undefined,
  userToken: string,
) {
  const updatedTasks = tasks.map(t =>
    t?.id === task?.id ? {...t, checked: !t?.checked} : t,
  );

  callback(updatedTasks);

  const taskToUpdate = isSubCategory
    ? {
        ...task,
        checked: !task?.checked,
        subCategoryId: category?.id,
      }
    : {
        ...task,
        checked: !task?.checked,
        categoryId: category?.id,
      };

  try {
    const response = await fetch(`${API_HOST}api/Task/${task?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(taskToUpdate),
    });
    if (response.ok) {
      console.log('Task updated successfully');
    } else {
      console.log('Task update failed');
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(
  task: ITask,
  tasks: ITask[],
  callback: Function,
  userToken: string,
) {
  const updatedTasks = tasks.filter(t => t?.id !== task?.id);
  callback(updatedTasks);

  try {
    const response = await fetch(`${API_HOST}api/Task/${task?.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.ok) {
      console.log('Task deleted successfully');
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    console.log(error);
  }
}

function setMinimumTime(date: Date, start: boolean): Date {
  const newDate = new Date(date);
  if (start) {
    newDate.setHours(0, 0, 0, 0);
  } else {
    newDate.setHours(23, 59, 59, 999);
  }
  return newDate;
}

export async function getAllWeeklyTask(callback: Function, userToken: string) {
  try {
    const response = await fetch(`${API_HOST}api/User/tasks`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      data.reverse();
      data.sort((a: ITask, b: ITask) => {
        if (a?.date === undefined && b?.date === undefined) {
          return 0;
        } else if (a?.date === undefined) {
          return 1;
        } else if (b?.date === undefined) {
          return -1;
        } else {
          const aDate = new Date(a?.date);
          const bDate = new Date(b?.date);
          return aDate.getTime() - bDate.getTime();
        }
      });
      const currentDate = new Date();
      const minimumDate = setMinimumTime(currentDate, true);

      const oneWeekLater = new Date(
        currentDate.getTime() + 7 * 24 * 60 * 60 * 1000,
      );
      const maximumDate = setMinimumTime(oneWeekLater, false);

      const thisWeekTasks = data.filter((task: ITask) => {
        if (task?.date !== undefined) {
          const taskDate = new Date(task?.date);
          return (
            taskDate >= minimumDate && taskDate <= maximumDate && !task?.checked
          );
        } else {
          return false;
        }
      });
      callback(thisWeekTasks);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.log(error);
  }
}
