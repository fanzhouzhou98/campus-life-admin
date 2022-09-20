import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon } from 'antd'
import CustomMenu from '@/components/CustomMenu'

const { Sider } = Layout

const AppAside = props => {
    let { menuToggle, menu } = props
    return (
        <Sider className='aside' collapsed={menuToggle}>
            <div className='logo'>
                <p>
                    <Icon type='rocket' style={{ fontSize: '3.8rem', color: '#fff' }} />
                </p>
            </div>
            <CustomMenu menu={menu}></CustomMenu>
        </Sider>
    )
}

AppAside.propTypes = {
    menuToggle: PropTypes.bool,
    menu: PropTypes.array.isRequired
}

export default AppAside
