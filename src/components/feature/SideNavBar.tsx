/**
 * SideNavBar component
 *
 * This component renders a sidebar navigation menu using Ant Design's Menu component.
 * The navigation items are defined in the `navItems` array, and the component
 * automatically determines the default open keys based on the current location.
 */

import React, { useEffect, useMemo } from "react"
import { Menu, MenuProps } from "antd"
import { Link, useLocation } from "react-router-dom"
import {
  HomeOutlined,
  ControlOutlined,
  CloudOutlined,
  ApartmentOutlined,
  AreaChartOutlined,
  GroupOutlined,
} from "@ant-design/icons"

// Interface for defining the structure of a navigation item
interface NavItem {
  key: string
  label: string
  icon?: React.ReactNode
  path?: string
  children?: NavItem[]
  disabled?: boolean
}

const SideNavBar: React.FC = () => {
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([location.pathname]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  // Define the navigation items and memoize it
  const navItems: NavItem[] = useMemo(
    () => [
      {
        key: "/",
        label: "Home",
        icon: <HomeOutlined />,
        path: "/",
      },
      {
        key: "/charge-management",
        label: "Charge Management",
        icon: <ControlOutlined />,
        children: [
          {
            key: "/charge-management/cloud",
            label: "Cloud",
            icon: <CloudOutlined />,
            children: [
              {
                key: "/charge-management/cloud/azure",
                label: "Azure",
                icon: <ApartmentOutlined />,
                path: "/charge-management/cloud/azure",
              },
            ],
          },
          {
            key: "/charge-management/saas",
            label: "SaaS",
            icon: <ApartmentOutlined />,
            path: "/charge-management/saas",
            disabled: true,
          },
        ],
      },
      {
        key: "/account-management",
        label: "Account Management",
        icon: <GroupOutlined />,
        path: "/account-management",
        disabled: true,
      },
      {
        key: "/forecast-budgets",
        label: "Forecast & Budgets",
        icon: <AreaChartOutlined />,
        path: "/forecast-budgets",
        disabled: true,
      },
    ],
    [],
  )

  // Recursive function to render the navigation items as Ant Design Menu items
  const renderNavItems = (items: NavItem[]): MenuProps["items"] => {
    return items.map((item) => {
      if (item.children) {
        const childItems = renderNavItems(item.children)
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: childItems,
          disabled: item.disabled,
        }
      } else {
        return {
          key: item.key,
          icon: item.icon,
          label: (
            <Link
              to={item.path!}
              style={{ pointerEvents: item.disabled ? "none" : "auto" }} // Disable pointer events if the item is disabled
            >
              {item.label}
            </Link>
          ),
          disabled: item.disabled,
        }
      }
    })
  }

  // Memoized function to calculate the default open keys based on the current location
  const getDefaultOpenKeys = useMemo(() => {
    const currentPath = location.pathname.split("?")[0]
    const keys = new Set<string>()

    // Recursive function to traverse the navigation items and add the appropriate keys to the set
    const traverseItems = (items: NavItem[]) => {
      for (const item of items) {
        const itemPath = item.path || ""
        if (currentPath === "/") {
          // If the current path is the root path, don't open any submenus
          continue
        } else if (
          currentPath === itemPath ||
          currentPath.startsWith(`${itemPath}/`)
        ) {
          // If the current path matches the item's path or is a child of the item's path
          keys.add(item.key) // Add the item's key to the set
          if (item.path) {
            // If the item has a path, add all the parent keys to the set by splitting the path
            const parentKeys = item.path.split("/").slice(0, -1)
            parentKeys.forEach((key, index) => {
              const parentKey = `/${parentKeys.slice(0, index + 1).join("/")}`
              keys.add(parentKey)
            })
          }
        }
        if (item.children) {
          // Recursively traverse the children items
          traverseItems(item.children)
        }
      }
    }

    traverseItems(navItems)
    return Array.from(keys) // Convert the set to an array
  }, [location.pathname, navItems])

  // Use the memoized value of getDefaultOpenKeys
  const defaultOpenKeys = getDefaultOpenKeys

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      // defaultSelectedKeys={[location.pathname]} // Set the selected key based on the current location
      defaultOpenKeys={defaultOpenKeys} // Set the open keys based on the calculated default open keys
      items={renderNavItems(navItems)} // Render the navigation items
    />
  )
}

export default SideNavBar
