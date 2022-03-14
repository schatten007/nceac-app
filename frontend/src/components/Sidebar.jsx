import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';


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
        </SubMenu>
        <SubMenu title="Form" icon={<FaUser />}>
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

export default Sidebar