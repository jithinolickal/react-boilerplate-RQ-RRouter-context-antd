import { Navigate, Outlet } from "react-router-dom"
import useQueryParams from "../hooks/useQueryParam"
import MainLayout from "../pages/layout/MainLayout"
import { type TRoute } from "./routes.types"

const Users = () => {
  return (
    <>
      <div>Users11</div>
      <Outlet />
    </>
  )
}

const User = () => {
  return (
    <>
      <div>User Profile</div>
      <Outlet />
    </>
  )
}
const Azure = () => {
  const [params, setParams] = useQueryParams()
  console.log("searchParams", params)

  const handleChange = (newFilter) => {
    setParams({ ...params, [newFilter]: newFilter })
  }

  return (
    <>
      <div>Sub User Profile</div>;
      <button onClick={() => handleChange("newFiltervalue")}>
        Change Filter
      </button>
    </>
  )
}

const Home = () => {
  return <div>Home</div>
}
const About = () => {
  return <div>About</div>
}

const routes: TRoute[] = [
  {
    path: "/",
    element: <MainLayout />,
    name: "Home",
    fullPath: "/",
    children: [
      { path: "/", element: <Home />, name: "Home", fullPath: "/" },
      {
        path: "/charge-management",
        name: "Charge Management",
        fullPath: "/charge-management",
        children: [
          // Default child route for /charge-management
          { path: "", element: <Navigate to="cloud" replace /> },
          {
            path: "cloud",
            name: "Cloud",
            fullPath: "/charge-management/cloud",
            children: [
              // Default child route for /charge-management/cloud
              { path: "", element: <Navigate to="azure" replace /> },
              {
                path: "azure",
                element: <Azure />,
                name: "Azure",
                fullPath: "/charge-management/cloud/azure",
              },
            ],
          },
        ],
      },
    ],
  },
]

export default routes
