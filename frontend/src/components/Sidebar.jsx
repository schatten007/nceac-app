import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaUser, FaWpforms } from 'react-icons/fa'
import { AiFillFolderOpen } from 'react-icons/ai';
import { Link } from 'react-router-dom';



// import 'react-pro-sidebar/dist/css/styles.css';
import '../Styles/SidebarOverride.scss'



function Sidebar() {
  return (
    <ProSidebar>
        <Menu iconShape="square">
            <MenuItem icon={<FaGem />}>Dashboard
                <Link to="/" />
            </MenuItem>
            <SubMenu title="User" icon={<FaUser />}>
                <MenuItem>Registration
                    <Link to="/register" />
                </MenuItem>
                <MenuItem>Login
                    <Link to="/login" />
                </MenuItem>
                <MenuItem>Subject
                    <Link to="/subject" icon={<AiFillFolderOpen />} />
                </MenuItem>
            </SubMenu>
            <SubMenu title="Form" icon={<FaWpforms />}>
                <MenuItem>New Form
                    <Link to="/form/get" />
                </MenuItem>
                <MenuItem>Check Forms
                    <Link to="/form/check" />
                </MenuItem>
            </SubMenu>
        </Menu>
    </ProSidebar>
)
}

export default Sidebar;