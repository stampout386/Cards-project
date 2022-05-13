import React from 'react'
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import s from './SuperDoubleRange.module.css'

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    min: number
    max: number
    step: number
    disable?: boolean
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    { onChangeRange, value, min, max, step }
) => {
    const onChange = (value: any) => {
        if (onChangeRange) onChangeRange(value)}

    return <Range className={s.main}
                  min={min}
                  max={max}
                  value={value}
                  step={step}
                  onChange={onChange}
                  allowCross={false} />
}