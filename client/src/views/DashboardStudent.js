import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  CssBaseline,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GradeIcon from "@mui/icons-material/Grade";
import ScoreIcon from "@mui/icons-material/Score";
import UserMenu from "../components/viewStudent/UserMenu";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import "../css/DashboardUser.css";
import { Outlet, useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess"; // Icon thu gọn
import ExpandMore from "@mui/icons-material/ExpandMore"; // Icon mở rộng
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const DashboardStudent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({}); // State cho submenu
  const isMobile = useMediaQuery("(max-width:600px)"); // Xác định nếu là màn hình nhỏ
  const navigate = useNavigate();
  const location = useLocation(); // Thêm hook useLocation

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle menu con
  const handleToggleSubMenu = (index) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const menuItems = [
    {
      text: "Trang chủ",
      icon: <HomeIcon />,
      onClick: () => navigate("/dashboardStudent"),
      path: "/dashboardStudent",
    },
    {
      text: "Nhóm sinh viên",
      icon: <GroupIcon />,
      subMenu: [
        {
          text: "Danh sách nhóm sinh viên",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => navigate("/dashboardStudent/list-student-groups"),
          path: "/dashboardStudent/list-student-groups",
        },
      ],
    },
    {
      text: "Đề tài",
      icon: <AssignmentIcon />,
      subMenu: [
        {
          text: "Danh sách đề tài",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => navigate("/dashboardStudent/list-student-topics"),
          path: "/dashboardStudent/list-student-topics",
        },
        {
          text: "Đề Tài Của Tôi",
          icon: <GroupIcon />,
          onClick: () => navigate("/dashboardStudent/TopicStudent"),
          path: "/dashboardStudent/TopicStudent",
        },
      ],
    },
    {
      text: "Báo cáo khóa luận",
      icon: <GroupIcon />,
      subMenu: [
        {
          text: "Đăng báo cáo khóa luận",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => navigate("/dashboardStudent/submit-report"),
          path: "/dashboardStudent/submit-report",
        },
      ],
    },
    {
      text: "Hội đồng phản biện",
      icon: <GradeIcon />,
      onClick: () => navigate("/dashboardStudent/review-teacher"),
      path: "/dashboardStudent/review-teacher",
    },
    {
      text: "Bảng điểm",
      icon: <ScoreIcon />,
      subMenu: [
        {
          text: "Bảng điểm của tôi",
          icon: <FontAwesomeIcon icon={faChartBar} />,
          onClick: () => navigate("/dashboardStudent/score-student"),
          path: "/dashboardStudent/score-student",
        },
      ],
    },
  ];

  // Hàm kiểm tra xem một mục menu có đang được chọn hay không
  const isMenuItemSelected = (item) => {
    // Kiểm tra cho menu chính
    if (item.path && location.pathname === item.path) return true;

    // Kiểm tra cho submenu
    if (item.subMenu) {
      return item.subMenu.some(
        (subItem) => subItem.path && location.pathname === subItem.path
      );
    }

    return false;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* AppBar cho header */}
      <AppBar
        position="fixed"
        sx={{
          width:
            sidebarOpen && !isMobile ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0,
          height: "80px", // Giảm chiều cao của AppBar
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard Sinh viên
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
          >
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Ngăn kéo (Drawer) bên trái */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          width: "60px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={
                  item.subMenu ? () => handleToggleSubMenu(index) : item.onClick
                }
                sx={{
                  backgroundColor: isMenuItemSelected(item)
                    ? "#E0E0E0" // Màu nền khi được chọn
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "#BFBFBF",
                    fontWeight: "bold",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subMenu &&
                  (openSubMenu[index] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {/* Hiển thị các subMenu khi openSubMenu[index] = true */}
              {item.subMenu && (
                <Collapse in={openSubMenu[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem, subIndex) => (
                      <ListItem
                        button
                        key={subIndex}
                        /* sx={{ pl: 4 }}
                        onClick={subItem.onClick} 
                      >*/
                        sx={{
                          pl: 4,
                          backgroundColor: isMenuItemSelected(subItem)
                            ? "#E0E0E0" // Màu nền khi được chọn
                            : "transparent",
                          "&:hover": {
                            backgroundColor: "#BFBFBF",
                            fontWeight: "bold",
                          },
                        }}
                        onClick={subItem.onClick}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {/* Nội dung chính của trang */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width:
            sidebarOpen && !isMobile ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0,
          transition: "width 0.3s",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardStudent;
