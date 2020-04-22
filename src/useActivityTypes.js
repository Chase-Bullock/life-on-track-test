import { useEffect, useState } from "react"
import { fetchActivityTypes, addNewActivityTypeService, updateActivityTypeService } from './actions/actions';

const cache = {}

export function useActivityTypes(uid, { listen } = { listen: true }) {
  const cached = cache[uid]
  const [activities, setActivities] = useState(cached)
  useEffect(() => {
    if (listen) {
      return fetchActivityTypes(uid, taskTypes => {
        cache[uid] = taskTypes
        setActivities(taskTypes)
      })
    }
  }, [uid, listen])
  return activities
}

export async function addActivityTypes(newActivityType) {
  delete newActivityType.id;
  addNewActivityTypeService(newActivityType);
  return
}

export async function updateActivityTypes(updatedActivityType) {
  console.log("updateTaskTypes", updatedActivityType)
  updateActivityTypeService(updatedActivityType);
  return
}
