import { EditIcon, UnlockIcon }                                     from "@chakra-ui/icons";
import { AiFillFolderOpen, AiFillFolderAdd, AiFillSetting,}         from "react-icons/ai";
import { IoLogOutSharp }                                            from "react-icons/io5";

export const UnregisteredUserMenu = [


  {
    id: 1,
    title: "Log In",
    MenuItemIcon: UnlockIcon,
    route: "/login",
  },
  {
    id: 2,
    title: "Register",
    MenuItemIcon: EditIcon,
    route: "/register",
  },


];

export const RegisteredUserMenu = [


  {
    id: 1,
    title: "My Reports",
    MenuItemIcon: AiFillFolderOpen,
    route: "/reports",
  },
  {
    id: 2,
    title: "Create Report",
    MenuItemIcon: AiFillFolderAdd,
    route: "/b",
  },
  {
    id: 3,
    title: "Log Out",
    MenuItemIcon: IoLogOutSharp,
    route: "/signout",
  },


];

export const AdminUserMenu = [


  {
    id: 1,
    title: "My Reports",
    MenuItemIcon: AiFillFolderOpen,
    route: "/reports",
  },
  {
    id: 2,
    title: "Create Report",
    MenuItemIcon: AiFillFolderAdd,
    route: "/b",
  },
  {
    id: 3,
    title: "Admin Panel",
    MenuItemIcon: AiFillSetting,
    route: "/admin",
  },
  {
    id: 4,
    title: "Log Out",
    MenuItemIcon: IoLogOutSharp,
    route: "/signout",
  },


];
