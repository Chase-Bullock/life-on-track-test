import { useEffect, useState } from "react"
import { fetchTaskTypes, addNewTaskType } from './actions/actions';

const cache = {}

export function useTaskTypes(uid, { listen } = { listen: true }) {
  const cached = cache[uid]
  const [taskTypes, setTaskTypes] = useState(cached)
  useEffect(() => {
    if (listen) {
      return fetchTaskTypes(uid, taskTypes => {
        cache[uid] = taskTypes
        setTaskTypes(taskTypes)
      })
    }
  }, [uid, listen])
  return taskTypes
}

export async function addTaskType(newTaskType) {
  addNewTaskType(newTaskType);
  return
}
