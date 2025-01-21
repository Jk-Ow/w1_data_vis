import "./Button.css"

function Button({clickEvent, activeState, children}){
    return(
        <button onClick={clickEvent} className={activeState?"active":""}>
            {children}
        </button>
    )
}

export default Button