import React, { useContext } from "react"
import { Button, Layout } from "antd"
import { Outlet, useLocation } from "react-router-dom"
import CustomSider from "./CustomSider"
import Breadcrumb from "../../components/common/Breadcrumb"
import {
  StarOutlined,
  StarFilled,
  BellOutlined,
  HistoryOutlined,
} from "@ant-design/icons"
import { AppContext } from "../../shared/AppContext"

const { Content } = Layout

const MainLayout: React.FC = () => {
  const location = useLocation()
  const { isFavorite, addFavorite, removeFavorite } = useContext(AppContext)
  const currentPath = location.pathname

  const handleFavoriteClick = () => {
    if (isFavorite(currentPath)) {
      removeFavorite(currentPath)
    } else {
      addFavorite(currentPath)
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomSider />
      <Layout style={{ flex: 1 }}>
        <Content
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{
              padding: "0 1rem",
              backgroundColor: "#fff",
              minHeight: "3rem",
              borderBottom: "3px solid #F5F5F5",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Button
              icon={isFavorite(currentPath) ? <StarFilled /> : <StarOutlined />}
              onClick={handleFavoriteClick}
            />
            <Breadcrumb />
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "end",
                gap: "0.5rem",
              }}
            >
              <Button icon={<BellOutlined />} disabled/>
              <Button icon={<HistoryOutlined />} />
            </div>
          </div>
          <div style={{ padding: "0.5rem", background: "#fff", flex: 1 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
