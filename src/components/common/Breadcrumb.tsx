/**
 * This component generates breadcrumbs based on the current URL path.
 * It uses the routes configuration to map URL paths to breadcrumb names.
 */
import React from "react"
import { useLocation, Link } from "react-router-dom"
import { Breadcrumb as AntBreadcrumb } from "antd"
import routes from "../../routes" // adjust the path according to your project structure
import { type TRoute } from "../../routes/routes.types"

/**
 * Function to find a route by fullPath in the routes configuration.
 *
 * This function traverses the routes array and returns the first route that matches the given path.
 * If the route has children, it recursively searches through them as well.
 *
 * @param path - The path to search for.
 * @param routes - The routes to search in.
 * @returns The matching route, or undefined if no match is found.
 */
const findRouteByFullPath = (
  path: string,
  routes: TRoute[],
): TRoute | undefined => {
  for (const route of routes) {
    if (route.fullPath === path) return route
    if (route.children) {
      const foundRoute = findRouteByFullPath(path, route.children)
      if (foundRoute) return foundRoute
    }
  }
}

const Breadcrumb: React.FC = () => {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  const breadcrumbNames: string[] = []
  let fullPathUrl = ""

  // Build the breadcrumb names based on the current URL path
  pathnames.forEach((path) => {
    fullPathUrl += `/${path}`
    const route = findRouteByFullPath(fullPathUrl, routes)
    if (route?.name) {
      breadcrumbNames.push(route.name)
    }
  })

  // Generate the breadcrumb items
  const items = breadcrumbNames.map((name, index) => {
    const isLastItem = index === breadcrumbNames.length - 1
    const to = `/${pathnames.slice(0, index + 1).join("/")}`

    return {
      title: isLastItem ? name : <Link to={to}>{name}</Link>,
    }
  })

  // If we're on the home page, display "Home"
  if (location.pathname === "/") {
    items.unshift({ title: "Home" })
  }

  return <AntBreadcrumb items={items} />
}

export default Breadcrumb
