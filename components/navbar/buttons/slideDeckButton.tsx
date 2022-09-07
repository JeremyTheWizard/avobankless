import React from 'react'

type Props = {
  text: String
}

export const slideDeckButton: React.FC<Props> = ({text}) => {
  return (
    <button onClick={() => {}}className="border-[1px] px-18 py-3 text-darkishRed rounded-100 border-darkGreen">{text}</button>
  )
}

export default slideDeckButton