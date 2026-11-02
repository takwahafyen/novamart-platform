import { AlignLeft, Archive, BarChart, Box, Camera, Chrome, Clipboard, DollarSign, Home, LogIn, Settings, Tag, UserPlus, Users } from "react-feather";

export const MENUITEMS: any = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Products",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      
  
          { path: "/products/physical/category", title: "Category", type: "link" },
          { path: "/products/physical/product-list", title: "Product List", type: "link" },
          { path: "/products/physical/add-product", title: "Add Product", type: "link" },
        ],
      },


  {
    title: "Orders",
    icon: DollarSign,
    type: "sub",
    active: false,
  
       path: "/sales/orders", title: "Orders", type: "link" ,
    
  },
 
 
  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "User List", type: "link" },
      { path: "/users/create-user", title: "Create User", type: "link" },
    ],
  },
 

  
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  },
 
];
