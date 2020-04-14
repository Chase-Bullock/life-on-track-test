import { initStore } from './store';
import * as action from '../actions/actions';

let initTasks;

const configureStore = () => {
  const actions = {
    ADD: (state, newTaskType) => {
      action.addNewTaskType(newTaskType)
    },
    SUB: (state, taskId) => {
      //remove taskType
    },
    FETCH_TASKS: () => {
      let tasks = action.fetchTaskTypes(1);

      return { tasks }
    }
  };
  initStore(actions, {
   tasks: []
  });
};

export default configureStore;