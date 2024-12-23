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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TeacherInfo from "../components/viewTeacher/TeacherInfo";
import UserMenu from "../components/viewStudent/UserMenu";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SchoolIcon from "@mui/icons-material/School";
import SendIcon from "@mui/icons-material/Send";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import "../css/DashboardTeacher.css";

const drawerWidth = 240;

const DashboardTeacher = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // Thêm hook useLocation
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
      onClick: () => navigate("/dashboardTeacher"),
      path: "/dashboardTeacher",
    },
    {
      text: "Quản lý báo cáo",
      icon: <GroupIcon />,
      submenu: [
        {
          text: "Báo cáo của sinh viên",
          icon: <DocumentScannerIcon />,
          onClick: () => navigate("/dashboardTeacher/manage-report-student"),
          path: "/dashboardTeacher/manage-report-student",
        },
      ],
    },
    {
      text: "Đề Tài",
      icon: <AssignmentIcon />,
      submenu: [
        {
          text: "Quản Lý Đề Tài",
          icon: <CloudUploadIcon />,
          onClick: () => navigate("/dashboardTeacher/upload-topic"),
          path: "/dashboardTeacher/upload-topic",
        },
      ],
    },
    {
      text: "Quản Lý Sinh Viên",
      icon: <PeopleIcon />,
      submenu: [
        {
          text: "Danh Sách Nhóm Sinh Viên",
          icon: <ListAltIcon />,
          onClick: () =>
            navigate("/dashboardTeacher/list-student-group-teacher"),
          path: "/dashboardTeacher/list-student-group-teacher",
        },
      ],
    },
    {
      text: "Nhóm phân công chấm điểm",
      icon: <GavelIcon />,
      submenu: [
        {
          text: "Nhóm được phân công chấm phản biện",
          icon: <PeopleAltIcon />,
          onClick: () => navigate("/dashboardTeacher/topic-review"),
          path: "/dashboardTeacher/topic-review",
        },
        {
          text: "Nhóm được phân công chấm hội đồng",
          icon: <AccountBalanceIcon />,
          onClick: () => navigate("/dashboardTeacher/topic-council"),
          path: "/dashboardTeacher/topic-council",
        },
        {
          text: "Nhóm được phân công chấm poster",
          icon: <DesignServicesIcon />,
          onClick: () => navigate("/dashboardTeacher/topic-poster"),
          path: "/dashboardTeacher/topic-poster",
        },
      ],
    },
    {
      text: "Điểm",
      icon: <StarIcon />,
      submenu: [
        {
          text: "Nhập Điểm",
          icon: <EditIcon />,
          onClick: () => navigate("/dashboardTeacher/list-student-teacher"),
          path: "/dashboardTeacher/list-student-teacher",
        },
        {
          text: "Xem Điểm",
          icon: <SchoolIcon />,
          onClick: () => navigate("/dashboardTeacher/view-scores"),
          path: "/dashboardTeacher/view-scores",
        },
      ],
    },

    // gửi thông báo đang phát triển
    /*     {
      text: "Thông báo",
      icon: <EditNotificationsIcon />,
      submenu: [
        {
          text: "Quản Lý Thông Báo",
          icon: <SendIcon />,
          onClick: () => navigate("/dashboardTeacher/notifications"),
        },
      ],
    }, */

    {
      text: "Thống kê",
      icon: <HomeIcon />,
      onClick: () => navigate("/dashboardTeacher/StatisticsTeacher"),
      path: "/dashboardTeacher/StatisticsTeacher",
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
      <AppBar
        position="fixed"
        sx={{
          width:
            sidebarOpen && !isMobile ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: sidebarOpen && !isMobile ? `${drawerWidth}px` : 0,
          height: "80px",
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
          <Typography
            variant="h5"
            noWrap
            component="div"
            className="dashboard-title"
          >
            Dashboard Giảng viên
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
            <div key={index}>
              <ListItem
                button
                onClick={() => {
                  if (item.submenu) {
                    handleToggleSubMenu(index);
                  } else if (item.onClick) {
                    item.onClick();
                  }
                }}
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
                {item.submenu &&
                  (openSubMenu[index] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.submenu && (
                <Collapse in={openSubMenu[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem, subIndex) => (
                      <ListItem
                        button
                        key={subIndex}
                        /* onClick={subItem.onClick} */
                        /* sx={{ pl: 4 }}
                      > */
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
            </div>
          ))}
        </List>
      </Drawer>

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
        <Box className="main-content">
          {location.pathname === "/dashboardTeacher" && (
            <>
              <Typography variant="h5" className="teacher-info-title">
                Thông tin giảng viên
              </Typography>
              <TeacherInfo />
            </>
          )}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardTeacher;
