import React from 'react'

const CustomBtn = (  {text, onClick, style={backgroundColor: "blue"}, type, className}) => {
  return (
    <div>
      <button onClick={onClick} style={style} type={type} className={className}>
        {text}
      </button>
    </div>
  )
}

export default CustomBtn
