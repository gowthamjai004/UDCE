import {

    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText

} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 220;

function Sidebar() {

    return (

        <Drawer

            variant="permanent"

            sx={{

                width: drawerWidth,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    boxSizing: "border-box"

                }

            }}

        >

            <Toolbar />

            <List>

                <ListItem disablePadding>

                    <ListItemButton>

                        <ListItemIcon>

                            <DashboardIcon />

                        </ListItemIcon>

                        <ListItemText primary="Dashboard" />

                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                    <ListItemButton>

                        <ListItemIcon>

                            <StorageIcon />

                        </ListItemIcon>

                        <ListItemText primary="Databases" />

                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                    <ListItemButton>

                        <ListItemIcon>

                            <CleaningServicesIcon />

                        </ListItemIcon>

                        <ListItemText primary="Cleaning" />

                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                    <ListItemButton>

                        <ListItemIcon>

                            <AssessmentIcon />

                        </ListItemIcon>

                        <ListItemText primary="Reports" />

                    </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                    <ListItemButton>

                        <ListItemIcon>

                            <SettingsIcon />

                        </ListItemIcon>

                        <ListItemText primary="Settings" />

                    </ListItemButton>

                </ListItem>

            </List>

        </Drawer>

    );

}

export default Sidebar;