import { useEffect, useState } from "react"
import { fetchActivities, addNewActivityService, updateActivityService } from './actions/actions';

const cache = {}

export function useActivities(uid, { listen } = { listen: true }) {
  const cached = cache[uid]
  const [activities, setActivities] = useState(cached)
  useEffect(() => {
    if (listen) {
      return fetchActivities(uid, activities => {
        cache[uid] = activities
        setActivities(activities)
      })
    }
  }, [uid, listen])
  return activities
}

export async function addActivity(newActivity) {
  delete newActivity.id;
  addNewActivityService(newActivity);
  return
}

export async function updateActivity(updatedActivity) {
  console.log("updateTaskTypes", updatedActivity)
  updateActivityService(updatedActivity);
  return
}
