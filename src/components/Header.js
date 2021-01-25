import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Button from './Button'

const Header = ({ title, onClick, showAddTask }) => {
    const { color, text } = showAddTask 
        ? {color: 'red', text: 'Close Add Task'}
        : {color: 'green', text: 'Open Add Task'}

    const location = useLocation()

    return (
        <header className="header">
            <h1>{title}</h1>
            { location.pathname === '/' && <Button color={color} text={text} onClick={onClick} />}
        </header>    
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;