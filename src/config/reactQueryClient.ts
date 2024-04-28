import { QueryClient } from "@tanstack/react-query"

export default new QueryClient({
  defaultOptions: {
    queries: {
      // To cache api calls for 1min(from the time it is re-triggered. even if its invalidated(Eg: GET triggered forcefully after a POST), the stale time restarts from 0)
      /**
       * staleTime: 1000 * 60 * 1 - Means all the request will be "fresh"(not in stale state) for 1 min.
       * This means, no api calls will be made as the requests are "fresh".
       * Use this if you dont want to make any api calls for 1min, i.e, old api response saved in chache will be used.
       */
      staleTime: 1000 * 60 * 30, // 30min
    },
  },
})
