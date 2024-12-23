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
  useMediaQuery,
  Collapse, // Thêm Collapse từ MUI
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess"; // Icon mở rộng
import ExpandMore from "@mui/icons-material/ExpandMore"; // Icon thu gọn
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import UserMenu from "../components/viewStudent/UserMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet, useNavigate } from "react-router-dom";
import TopicIcon from "@mui/icons-material/Topic";
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SendIcon from "@mui/icons-material/Send";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import SummarizeIcon from "@mui/icons-material/Summarize";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import GradeIcon from "@mui/icons-material/Grade";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GavelIcon from "@mui/icons-material/Gavel";
import BlockIcon from "@mui/icons-material/Block";
import { useLocation } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const drawerWidth = 240;

const DashboardAdmin = () => {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({}); // State cho menu con
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)"); // Xác định nếu là màn hình nhỏ
  const location = useLocation(); // Thêm hook useLocation

  const toggleDrawer = () => {
    setOpen(!open);
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
      onClick: () => navigate("/dashboardAdmin"),
      path: "/dashboardAdmin", // Thêm path để so sánh
    },
    {
      text: "Quản lý giảng viên",
      icon: <SchoolIcon />,
      subMenu: [
        {
          text: "Quản lý tài khoản giảng viên",
          icon: <AccountCircleIcon />,
          onClick: () => navigate("/dashboardAdmin/manage-teacher-accounts"),
          path: "/dashboardAdmin/manage-teacher-accounts",
        },
        {
          text: "Danh sách giảng viên", // Thêm mục "Nhóm sinh viên"
          icon: <ListAltIcon />,
          onClick: () => navigate("/dashboardAdmin/teacher-management"), // Chuyển đến trang "Nhóm sinh viên"
          path: "/dashboardAdmin/teacher-management",
        },
      ],
    },
    {
      text: "Quản lý sinh viên",
      icon: <AccountBoxIcon />,
      subMenu: [
        {
          text: "Quản lý tài khoản sinh viên",
          icon: <AccountCircleIcon />,
          onClick: () => navigate("/dashboardAdmin/manage-student-accounts"),
          path: "/dashboardAdmin/manage-student-accounts",
        },
        {
          text: "Nhóm sinh viên", // Thêm mục "Nhóm sinh viên"
          icon: <GroupsIcon />,
          onClick: () => navigate("/dashboardAdmin/student-groups"), // Chuyển đến trang "Nhóm sinh viên"
          path: "/dashboardAdmin/student-groups",
        },
      ],
    },
    {
      text: "Quản lý đề tài",
      icon: <ArticleIcon />,
      subMenu: [
        {
          text: "Đề tài của giảng viên",
          icon: <TopicIcon />,
          onClick: () => navigate("/dashboardAdmin/manage-topics"),
          path: "/dashboardAdmin/manage-topics",
        },
        /*  {
          text: "Danh sách đề tài", // Thêm mục "Nhóm sinh viên"
          icon: <ListAltIcon />,
          onClick: () => navigate("/dashboardAdmin"), // Chuyển đến trang "Nhóm sinh viên"
        }, */
      ],
    },
    //Phân công chấm đề tài/poster
    {
      text: "Phân công chấm đề tài",
      icon: <GavelIcon />,
      subMenu: [
        {
          text: "Phân công chấm phản biện",
          icon: <AssignmentIndIcon />,
          onClick: () => navigate("/dashboardAdmin/review-topics"),
          path: "/dashboardAdmin/review-topics",
        },
        {
          text: "Phân công chấm hội đồng",
          icon: <AccountBalanceIcon />,
          onClick: () => navigate("/dashboardAdmin/council-topics"),
          path: "/dashboardAdmin/council-topics",
        },
        {
          text: "Phân công chấm poster",
          icon: <PictureAsPdfIcon />,
          onClick: () => navigate("/dashboardAdmin/poster-topics"),
          path: "/dashboardAdmin/poster-topics",
        },
      ],
    },

    //Danh sách Giảng viên được phân công
    {
      text: "Quản lý hội đồng phân công",
      icon: <AdminPanelSettingsIcon />,
      subMenu: [
        {
          text: "Quản lý hội đồng phản biện",
          icon: <AssignmentIndIcon />,
          onClick: () => navigate("/dashboardAdmin/manage-review-teacher"),
          path: "/dashboardAdmin/manage-review-teacher",
        },
        {
          text: "Quản lý hội đồng báo cáo",
          icon: <AccountBalanceIcon />,
          onClick: () => navigate("/dashboardAdmin/manage-council-teacher"),
          path: "/dashboardAdmin/manage-council-teacher",
        },
        {
          text: "Quản lý hội đồng poster",
          icon: <PictureAsPdfIcon />,
          onClick: () => navigate("/dashboardAdmin/manage-poster-teacher"),
          path: "/dashboardAdmin/manage-poster-teacher",
        },
      ],
    },
    // Quản lý báo cáo
    {
      text: "Quản lý báo cáo",
      icon: <SummarizeIcon />,
      subMenu: [
        {
          text: "Báo cáo khóa luận của sinh viên",
          icon: <InsertDriveFileIcon />,
          onClick: () => navigate("/dashboardAdmin/AdminReportList"),
          path: "/dashboardAdmin/AdminReportList",
        },
      ],
    },
    {
      text: "Quản lý điểm sinh viên",
      icon: <GradeIcon />,
      subMenu: [
        {
          text: "Điểm sinh viên",
          icon: <LeaderboardIcon />,
          onClick: () => navigate("/dashboardAdmin/manage-score"),
          path: "/dashboardAdmin/manage-score",
        },
      ],
    },
    {
      text: "Quản lý chức năng",
      icon: <ManageAccountsIcon />,
      subMenu: [
        {
          text: "Khóa chức năng",
          icon: <BlockIcon />,
          onClick: () => navigate("/dashboardAdmin/feature-management"),
          path: "/dashboardAdmin/feature-management",
        },
      ],
    },

    // gửi thông báo
    {
      text: "Thông báo",
      icon: <EditNotificationsIcon />,
      subMenu: [
        {
          text: "Gửi thông báo tổng",
          icon: <SendIcon />,
          onClick: () => navigate("/dashboardAdmin/notifications"),
          path: "/dashboardAdmin/notifications",
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
      <AppBar
        position="fixed"
        sx={{
          width: open && !isMobile ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: open && !isMobile ? `${drawerWidth}px` : 0,
          height: "80px",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Trang quản lý dành cho Admin
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
          >
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: "60px", //độ rộng của thanh dọc sau drawer
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
                  item.subMenu ? () => handleToggleSubMenu(index) : item.onClick // Gọi trực tiếp onClick nếu không có subMenu
                }
                /* sx={{
                  "&:hover": {
                    backgroundColor: "#BFBFBF", // Màu nền khi hover
                    fontWeight: "bold", // Chữ đậm hơn khi hover
                  },
                }} */
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
              <Collapse in={openSubMenu[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu &&
                    item.subMenu.map((subItem, subIndex) => (
                      <ListItem
                        button
                        key={subIndex}
                        /* sx={{
                          pl: 4,
                          "&:hover": {
                            backgroundColor: "#BFBFBF", // Màu nền khi hover
                            fontWeight: "bold", // Chữ đậm hơn khi hover
                          },
                        }} */
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
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: open && !isMobile ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: open && !isMobile ? `${drawerWidth}px` : 0,
          p: 3,
          transition: "width 0.3s",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
