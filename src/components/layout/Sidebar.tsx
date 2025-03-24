import React, { useState, useMemo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
  Collapse,
  Theme,
  SxProps,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Category as CategoryIcon,
  Group as GroupIcon,
  Restaurant as RestaurantIcon,
  ListAlt as ListAltIcon,
  LocalShipping as DeliveryIcon,
  Person as CustomerIcon,
  Inventory as ItemIcon,
  Email as EmailIcon,
  Payment as PaymentIcon,
  Image as ImageIcon,
  Notifications as NotificationsIcon,
  Web as WebIcon,
  Campaign as CampaignIcon,
  ExpandLess,
  ExpandMore,
  Apps as AppsIcon,
  Collections as CollectionsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
}

interface MenuItem {
  text: string;
  // icon: React.ReactElement;
  path: string;
  submenu?: boolean; // Optional flag to determine if it has a submenu
}

interface MainMenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  submenu?: boolean; // Optional flag to determine if it has a submenu
}


// Extracted styles
const drawerStyles = (open: boolean): SxProps<Theme> => ({
  width: open ? drawerWidth : 0,
  flexShrink: 0,
  position: 'fixed',
  height: '100%',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#2F3349',
    color: '#A5A9C2',
    borderRight: 'none',
    height: '100%',
    transform: open ? 'none' : `translateX(-${drawerWidth}px)`,
    transition: 'transform 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    visibility: 'visible !important',
    overflowX: 'hidden',
    marginTop: '64px',
    paddingBottom: '64px',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
});

const listItemStyles = (isSelected: boolean): SxProps<Theme> => ({
  minHeight: 48,
  px: 2.5,
  backgroundColor: isSelected ? '#FF5722' : 'transparent',
  color: isSelected ? 'white' : '#A5A9C2',
  '&.Mui-selected': {
    backgroundColor: '#FF5722',
    color: 'white',
    '&:hover': {
      backgroundColor: '#FF5722',
    },
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
  },
  '&:hover': {
    backgroundColor: isSelected ? '#FF5722' : 'rgba(255, 87, 34, 0.08)',
  },
});

const listItemIconStyles = (isSelected: boolean): SxProps<Theme> => ({
  minWidth: 40,
  color: isSelected ? 'white' : '#A5A9C2',
});

const listItemTextStyles = {
  '& .MuiTypography-root': {
    fontSize: '0.9rem',
  },
};

// Memoized menu items
const settingsMenuItems: MenuItem[] = [
  { text: 'General Settings', path: '/settings/general' },
  { text: 'SMTP Settings', path: '/settings/smtp' },
  { text: 'Social Media Settings', path: '/settings/social' },
  { text: 'SMS & Notification Settings', path: '/settings/notifications' },
  { text: 'Image Settings', path: '/settings/image' },
  { text: 'No Image Settings', path: '/settings/no-image'},
  { text: 'Payment Settings', path: '/settings/payment' },
  { text: 'Manage Banner', path: '/settings/banner' },
  { text: 'Manage Advertisement', path: '/settings/advertisement' },
  { text: 'App Version Settings', path: '/settings/app-version' },
  { text: 'App Image Settings', path: '/settings/app-image'},
  { text: 'Manage Email Templates', path: '/settings/email-templates'},
  { text: 'Manage SMS Templates', path: '/settings/SMS-templates'},
];

const subAdminMenuItems: MenuItem[] = [
  { text: 'Add Sub Admin',path: '/sub-admin/add' },
  { text: 'Manage Sub Admin List', path: '/sub-admin/list' },
];

const categoriesMenuItems: MenuItem[] = [
  { text: 'Manage Restaurant Sub Category',  path: '/categories/list' },
  { text: 'Manage Item Category',  path: '/categories/add' },
 
];

const restaurantOwnerManagementMenuItems: MenuItem[] = [
  { text: 'Add Restaurant Owner', path: '/restaurant-owners/add' },
  { text: 'Manage Restaurant Owner',  path: '/restaurant-owners/manage' },
];

const manageChoiceMenuItems: MenuItem[] = [
  { text: 'Add Choice group', path: '/add-choice' },
  { text: 'Manage Choice Group', path: '/manage-choice' },
];

const restaurantManagementMenuItems: MenuItem[] = [
  { text: 'Add Restaurant',  path: '/add-restaurant' },
  { text: 'Manage Restaurant',  path: '/manage-restaurant' },
];

const customerManagementMenuItems: MenuItem[] = [
  { text: 'Add Customer', path: '/add-customer' },
  { text: 'Manage Customer',  path: '/manage-customer' },
];

const itemManagementMenuItems: MenuItem[] = [
  { text: 'Add Item',  path: '/add-item' },
  { text: 'Manage Item',  path: '/manage-item' },
  { text: 'Item Bulk Upload', path: '/item-upload' },
];
const adminDeliveryManagerMenuItems: MenuItem[] = [
  { text: 'Add Admin Delivery Manager', path: '/add' },
  { text: 'Manage Delivery Manager', path: '/manage' },
];
const deliveryboyMenuItems: MenuItem[] = [
  { text: 'Add Delivery boy',  path: '/add' },
  { text: 'Manage Delivery boy',path: '/manage' },
];

const manageCouponMenuItems: MenuItem[] = [
  { text: 'Add Coupon', path: '/add' },
  { text: 'Manage Coupon', path: '/manage' },
];

const manageCMS: MenuItem[] = [
  { text: 'Add CMS', path: '/add' },
  { text: 'Manage CMS', path: '/manage' },
];

const manageFAQ: MenuItem[] = [
  { text: 'Add FAQ', path: '/add' },
  { text: 'Manage FAQ', path: '/manage' },
];

const reviewManagement: MenuItem[] = [
  { text: 'Manage Item Review',  path: '/add' },
  { text: 'Manage Restaurant Review', path: '/manage' },
  { text: 'Manage Order Review', path: '/add' },
];

const newsletterManagement: MenuItem[] = [
  { text: 'Manage Subscriber', path: '/add' },
  { text: 'Send Newsletter', path: '/manage' },
];

const subscriptionPlan: MenuItem[] = [
  { text: 'Add Subscription Plan',  path: '/add' },
  { text: 'Manage Subscription Plan', path: '/manage' },
  { text: 'User Subscriptions',  path: '/manage' },
];

const promotionalOffers: MenuItem[] = [
  { text: 'Manage Offers', path: '/add' },
  { text: 'Assign Offers and Loyalty Rewards',  path: '/manage' },
];

const reports: MenuItem[] = [
  { text: 'Over All Order Reports',  path: '/add' },
  { text: 'Restaurant Earning Reports', path: '/manage' },
  { text: 'Merchant Transaction Reports',  path: '/manage' },
  { text: 'Delivery Person Earning Reports',  path: '/manage' },
  { text: 'Delivery person Transaction Report',  path: '/manage' },
  { text: 'Consolidate Report', path: '/manage' }
];



// Updated mainMenuItems with submenu flag
const mainMenuItems: MainMenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', submenu: false },
  { text: 'Settings', icon: <CategoryIcon />, path: '/settings', submenu: true },
  { text: 'Sub Admin', icon: <ListAltIcon />, path: '/sub-admin', submenu: true },
  { text: 'Category Management', icon: <ListAltIcon />, path: '/categories', submenu: true },
  { text: 'Manage Choice Group', icon: <RestaurantIcon />, path: '/manageChoice', submenu: true },
  { text: 'Manage Choices', icon: <RestaurantIcon />, path: '/restaurants', submenu: false },
  { text: 'Restaurant Owner Management', icon: <CustomerIcon />, path: '/restaurant-owners', submenu: true},
  { text: 'Restaurant Management', icon: <ItemIcon />, path: '/restaurant-management', submenu: true },
  { text: 'Customer Management', icon: <DeliveryIcon />, path: '/customer-management', submenu: true },
  { text: 'Item Management', icon: <DeliveryIcon />, path: '/item-management', submenu: true },
  { text: 'Admin Delivery Manager', icon: <DeliveryIcon />, path: '/admin-delivery' ,submenu: true },
  { text: 'Delivery boy / Driver Management', icon: <DeliveryIcon />, path: '/delivery-boys',submenu: true },
  { text: 'Manage Coupon', icon: <DeliveryIcon />, path: '/manage-coupon',submenu: true },
  { text: 'Manage CMS', icon: <DeliveryIcon />, path: '/manage-CMS',submenu: true },
  { text: 'Manage FAQ', icon: <DeliveryIcon />, path: '/manage-FAQ',submenu: true },
  { text: 'Review Management', icon: <DeliveryIcon />, path: '/review-management',submenu: true },
  { text: 'Newsletter Management', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: true },
  { text: 'Subscription Plan', icon: <DeliveryIcon />, path: '/subscription-plan',submenu: true },
  { text: 'Customer Order Management', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Manage Customer Wallet', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Delivery Person Commission Tracking', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Stock Management', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Cancellation Payment', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Refer Friend Report', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Manage Featured Restaurant', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Failed Orders Management', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Delivery Boy Map', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
  { text: 'Promotional Offers & Loyalty Rewards', icon: <DeliveryIcon />, path: '/promotional-offers',submenu: true },
  { text: 'Reports', icon: <DeliveryIcon />, path: '/reports',submenu: true },
  { text: 'Push Notification', icon: <DeliveryIcon />, path: '/newsletter-management',submenu: false },
];

// Memoized MenuItem component
const MenuItem: React.FC<{
  item: MenuItem;
  isSelected: boolean;
  submenu: boolean;
  onClick: () => void;
  depth?: number;
}> = React.memo(({ item, isSelected, onClick, depth = 0 }) => (
  <ListItemButton
    onClick={onClick}
    selected={isSelected}
    sx={listItemStyles(isSelected)}
    style={{ paddingLeft: depth * 16 + 16 }}
  >
    <ListItemIcon sx={listItemIconStyles(isSelected)}></ListItemIcon>
    <ListItemText primary={item.text} sx={listItemTextStyles} />
  </ListItemButton>
));

// Memoized DropdownMenu component
const DropdownMenu: React.FC<{
  title: string;
  icon: React.ReactElement;
  items: MenuItem[];
  isOpen: boolean;
  isPathActive: boolean;
  onToggle: () => void;
  currentPath: string;
  onItemClick: (path: string) => void;
}> = React.memo(({ title, icon, items, isOpen, isPathActive, onToggle, currentPath, onItemClick }) => (
  <>
    <ListItem disablePadding>
      <ListItemButton onClick={onToggle} selected={isPathActive} sx={listItemStyles(isPathActive)}>
        <ListItemIcon sx={listItemIconStyles(isPathActive)}>{icon}</ListItemIcon>
        <ListItemText primary={title} sx={listItemTextStyles} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </ListItem>
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
  {items.map((item) => (
    <MenuItem
      key={item.path}
      item={item}
      isSelected={currentPath === item.path}
      onClick={() => onItemClick(item.path)}
      depth={1}
      submenu={true}  
    />
  ))}
</List>

    </Collapse>
  </>
));

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [subAdminOpen, setSubAdminOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [restaurantOwnerOpen, setRestaurantOwnerOpen] = useState(false);
  const [manageChoiseOpen, setManageChoiseOpen] = useState(false);
  const [manageRestaurantOpen, setManageRestaurantOpen] = useState(false);
  const [customerManagementOpen, setCustomerManagement] = useState(false);
  const [itemManagementOpen, setItemManagementOpen] = useState(false);
  const [addminDeliveryManagerOpen, setAddminDeliveryManagerOpenOpen] = useState(false);
  const [deliveryBoyOpen, setDeliveryBoyOpen] = useState(false);
  const [manageCouponOpen, setManageCouponOpen] = useState(false);
  const [manageCMSOpen, setManageCMSOpen] = useState(false);
  const [manageFAQOpen, seManageFAQOpen] = useState(false);
  const [reviewManagementOpen, setReviewManagementOpen] = useState(false);
  const [newsletterManagemenOpen, setNewsletterManagemenOpen] = useState(false);
  const [subscriptionPlannOpen, setSubscriptionPlannOpen] = useState(false);
  const [promotionalOffersOpen, setPromotionalOffersOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isSettingsPath = location.pathname.startsWith('/settings');
  const isSubAdminPath = location.pathname.startsWith('/sub-admin');
  const isCategoriesPath = location.pathname.startsWith('/categories');

  return (
    <Drawer variant="permanent" sx={drawerStyles(open)}>
      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <List>
          {mainMenuItems.map((item) =>
            item.submenu ? (
              <DropdownMenu
                key={item.path}
                title={item.text}
                icon={item.icon}
                items={ // Provide corresponding submenu items
                  item.path === '/settings'
                    ? settingsMenuItems
                    : item.path === '/sub-admin'
                    ? subAdminMenuItems
                    : item.path === '/categories' // Handle category menu separately
                    ? categoriesMenuItems
                    : item.path === '/restaurant-owners'
                    ? restaurantOwnerManagementMenuItems
                    : item.path === '/manageChoice'
                    ? manageChoiceMenuItems
                    : item.path === '/restaurant-management'
                    ? restaurantManagementMenuItems
                    : item.path === '/customer-management'
                    ? customerManagementMenuItems
                    : item.path === '/item-management'
                    ? itemManagementMenuItems
                    : item.path === '/admin-delivery'
                    ? adminDeliveryManagerMenuItems
                    : item.path === '/delivery-boys'
                    ? deliveryboyMenuItems
                    : item.path === '/manage-coupon'
                    ? manageCouponMenuItems
                    : item.path === '/manage-CMS'
                    ? manageCMS
                    : item.path === '/manage-FAQ'
                    ? manageFAQ
                    : item.path === '/review-management'
                    ? reviewManagement
                    : item.path === '/newsletter-management'
                    ? newsletterManagement
                    : item.path === '/subscription-plan'
                    ? subscriptionPlan
                    : item.path === '/promotional-offers'
                    ? promotionalOffers
                    : item.path === '/reports'
                    ? reports
                    : [] // Empty array if no submenu
                }
                isOpen={
                  item.path === '/settings'
                    ? settingsOpen
                    : item.path === '/sub-admin'
                    ? subAdminOpen
                    : item.path === '/categories' 
                    ? categoriesOpen
                    : item.path === '/restaurant-owners'
                    ? restaurantOwnerOpen
                    : item.path === '/manageChoice'
                    ? manageChoiseOpen
                    : item.path === '/restaurant-management'
                    ? manageRestaurantOpen
                    : item.path === '/customer-management'
                    ? customerManagementOpen
                    : item.path === '/item-management'
                    ? itemManagementOpen
                    : item.path === '/admin-delivery'
                    ? addminDeliveryManagerOpen
                    : item.path === '/delivery-boys'
                    ? deliveryBoyOpen
                    : item.path === '/manage-coupon'
                    ? manageCouponOpen
                    : item.path === '/manage-CMS'
                    ? manageCMSOpen
                    : item.path === '/manage-FAQ'
                    ? manageFAQOpen
                    : item.path === '/review-management'
                    ? reviewManagementOpen
                    : item.path === '/newsletter-management'
                    ? newsletterManagemenOpen
                    : item.path === '/subscription-plan'
                    ? subscriptionPlannOpen
                    : item.path === '/promotional-offers'
                    ? promotionalOffersOpen
                    : item.path === '/reports'
                    ? reportsOpen
                    : false // Default to false for other items
                }
                isPathActive={location.pathname.startsWith(item.path)}
                onToggle={() => {
                  if (item.path === '/settings') setSettingsOpen(!settingsOpen);
                  if (item.path === '/sub-admin') setSubAdminOpen(!subAdminOpen);
                  if (item.path === '/categories') setCategoriesOpen(!categoriesOpen);
                  if (item.path === '/restaurant-owners') setRestaurantOwnerOpen(!restaurantOwnerOpen); 
                  if (item.path === '/manageChoice') setManageChoiseOpen(!manageChoiseOpen);
                  if (item.path === '/restaurant-management') setManageRestaurantOpen(!manageRestaurantOpen);
                  if (item.path === '/customer-management') setCustomerManagement(!customerManagementOpen);
                  if (item.path === '/item-management') setItemManagementOpen(!itemManagementOpen);
                  if (item.path === '/admin-delivery') setAddminDeliveryManagerOpenOpen(!addminDeliveryManagerOpen);
                  if (item.path === '/delivery-boys') setDeliveryBoyOpen(!deliveryBoyOpen);
                  if (item.path === '/manage-coupon') setManageCouponOpen(!manageCouponOpen);
                  if (item.path === '/manage-CMS') setManageCMSOpen(!manageCMSOpen);
                  if (item.path === '/manage-FAQ') seManageFAQOpen(!manageFAQOpen);
                  if (item.path === '/review-management') setReviewManagementOpen(!reviewManagementOpen);
                  if (item.path === '/newsletter-management') setNewsletterManagemenOpen(!newsletterManagemenOpen);
                  if (item.path === '/subscription-plan') setSubscriptionPlannOpen(!subscriptionPlannOpen);
                  if (item.path === '/promotional-offers') setPromotionalOffersOpen(!promotionalOffersOpen);
                  if (item.path === '/reports') setReportsOpen(!reportsOpen);
                }}
                currentPath={location.pathname}
                onItemClick={handleNavigate}
              />
            ) : (
              <MenuItem
                key={item.path}
                item={item}
                isSelected={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
                submenu={false}
              />
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default React.memo(Sidebar);
