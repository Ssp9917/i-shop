import React from 'react'

const Container = (props) => {
  return (
    <div className={`${props.fluid ? "w-fill":"max-w-[1200px] mx-auto"} mx-auto ${props.extraClass}`} style={props.style}>
        {props.children}
    </div>
  )
}

export default Container