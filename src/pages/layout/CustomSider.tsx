import React, { useContext, useState } from "react"
import { Layout, Menu, Avatar } from "antd"
import { StarOutlined } from "@ant-design/icons"
import SideNavBar from "../../components/feature/SideNavBar"
import { AppContext } from "../../shared/AppContext"
import { Link } from "react-router-dom"

const { Sider } = Layout

interface FavoriteItem {
  key: string
  label: string
  path: string
}

const CustomSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { favorites } = useContext(AppContext)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const favoriteItems: FavoriteItem[] = favorites.map((path) => {
    const label = path === "/" ? "Home" : path.split("/").pop() || "Untitled"
    return {
      key: path,
      label,
      path,
    }
  })

  // const favorites: FavoriteItem[] = [
  //   { key: "favorite1", label: "Favorite 1" },
  //   { key: "favorite2", label: "Favorite 2" },
  //   // Add more favorite items as needed
  // ]

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      theme="light"
      style={{
        backgroundColor: "#fff",
        borderRight: "3px solid #F5F5F5",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            minHeight: "2rem",
          }}
        >
          <Avatar
            size={32}
            src="https://api.dicebear.com/8.x/identicon/svg?seed=Angel&backgroundColor=transparent"
          />
          {!collapsed && (
            <div>
              <h3 style={{ margin: 0 }}>John Doe</h3>
              {/* <p style={{ margin: 0, color: "#888" }}>john.doe@example.com</p> */}
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          style={{ backgroundColor: "#fff", borderRight: "none" }}
          selectedKeys={[]} // Set selectedKeys to an empty array so that no menu items are highlighted
          items={[
            {
              key: "favorites",
              icon: <StarOutlined />,
              label: "Favorites",
              children: favoriteItems.map((favorite) => ({
                key: favorite.key,
                label: (
                  <Link to={favorite.path} style={{ display: "block" }}>
                    {favorite.label.charAt(0).toUpperCase() +
                      favorite.label.slice(1)}
                  </Link>
                ),
              })),
            },
          ]}
        />
        <div style={{ width: "100%" }}>
          <SideNavBar />
        </div>
      </div>
    </Sider>
  )
}

export default CustomSider
