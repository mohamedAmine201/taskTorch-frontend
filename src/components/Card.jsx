import React, {forwardRef} from 'react'

const Card = forwardRef((props, ref) => {
  return (
    <div className={`w-fit mx-auto p-6 rounded-lg bg-gradient-to-r from-stone-600 via-stone-500 to-stone-800 shadow-md
    text-white ${props.className} `}
    ref={ref}
    >
        {props.children}
    </div>
  )
}
)
export default Card