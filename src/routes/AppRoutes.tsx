import { ReactElement } from "react"
import { Routes, Route } from "react-router-dom"
import routes from "./index"
import { type TRoute } from "./routes.types"

// Define a type for route objects
// interface RouteObject {
//   path: string
//   element?: ReactElement
//   children?: RouteObject[]
// }

// Recursive function to render routes
function renderRoutes(routes: TRoute[]): ReactElement[] {
  return routes.map((route) => (
    // Create a Route for each route object
    <Route key={route.path} path={route.path} element={route.element}>
      {/* If the route has children, render them as well */}
      {route.children && renderRoutes(route.children)}
    </Route>
  ))
}

function AppRoutes() {
  // Render the routes using the renderRoutes function
  return (
    <Routes>
      {renderRoutes(routes)}

      {/* If no route matches, render a 404 page */}
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export default AppRoutes
