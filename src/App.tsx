import { useContext } from "react"
import "./App.css"
import AppContextProvider, { AppContext } from "./shared/AppContext"
import reactQueryClient from "./config/reactQueryClient"
import { useCreateUser, useGetUsers } from "./api/users"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { ConfigProvider } from "antd"
import theme from "./shared/theme"

const First = () => {
  const appContext = useContext(AppContext)
  const createUserMutation = useCreateUser()
  const { data, isLoading, error } = useGetUsers(3)
  if (isLoading) return "Loading..."
  if (error) return "An error occurred"
  console.log("data", data)

  console.log("appContext", appContext)

  const handleSubmit = (user) => {
    createUserMutation.mutate(user)
  }
  if (createUserMutation.isError) {
    // Display an error alert
    alert("An error occurred: " + createUserMutation.error.message)
  }

  if (createUserMutation.isSuccess) {
    // Display a success alert
    alert("User created successfully")
  }

  return (
    <div>
      <h1>First Component</h1>
      <button
        onClick={() => handleSubmit({ title: "foo", body: "bar", userId: 1 })}
      >
        Create User
      </button>
    </div>
  )
}

function App() {
  return (
    <>
      <QueryClientProvider client={reactQueryClient}>
        <AppContextProvider>
          {/* <First /> */}
          <BrowserRouter>
            <ConfigProvider theme={theme}>
              <AppRoutes />
            </ConfigProvider>
          </BrowserRouter>
        </AppContextProvider>

        {/* This is for development purpose */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
