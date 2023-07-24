import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import '../App.css';
import HomeIcon from '@mui/icons-material/Home';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HistoryIcon from '@mui/icons-material/History';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

export default function SideBar() {
    return (
        <Sidebar className="app">
            <Menu>
                <MenuItem
                    component={<Link to="/" className="link" />}
                    className="menu1"
                    icon={<HomeIcon />}
                >
                    <h2>Home</h2>
                </MenuItem>
                <SubMenu label="Launches" icon={<RocketLaunchIcon />}>
                    <MenuItem
                        component={<Link to="pastLaunches" className="link" />}
                        icon={<HistoryIcon />}
                    >
                        Past Launches
                    </MenuItem>
                    <MenuItem
                        component={<Link to="upcomingLaunches" className="link" />}
                        icon={<ScheduleSendIcon />}
                    >
                        Upcoming Launches
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}