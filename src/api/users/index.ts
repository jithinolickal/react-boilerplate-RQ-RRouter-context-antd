import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiClient from "../index"

const getUser = (userId) => {
  console.log("getUser", userId)

  return apiClient.get(`/todos/${userId[1]}`)
}

export const createUser = (user) => {
  return apiClient.post("/posts", user)
}

export const useGetUsers = (userId) => {
  console.log("useGetUsers", userId)

  return useQuery({
    queryKey: ["users", userId],
    queryFn: ({ queryKey }) => getUser(queryKey),
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("users")
    },
  })
}
