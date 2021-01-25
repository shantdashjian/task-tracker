import PropTypes from 'prop-types'

const Button = ({ text, color, onClick }) => {
    return (
        <div>
            <button 
            style={{ backgroundColor: color}}
            className="button"
            onClick={onClick}>{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: 'silver'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
