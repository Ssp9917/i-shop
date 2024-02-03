import React, { useState } from 'react'

const MultiRangeSlider = ({min,max}) => {

    const [minVal,setMinValue] = useState(min);
    const [maxVal,setMaxValue] = useState(max);

    

  return (
    <div>
        <input type='range' />
    </div>
  )
}

export default MultiRangeSlider