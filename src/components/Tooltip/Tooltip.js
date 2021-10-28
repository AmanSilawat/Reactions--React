import React, { useMemo } from 'react';
import './style.css'

const Tooltip = ({ title, direction, distance }) => {
    let style = useMemo(() => {
        switch (direction) {
            case 'left': return { right: `calc(100% + ${distance}px)` }
            case 'right': return { left: `calc(100% + ${distance}px)` }
            case 'top': return { bottom: `calc(100% + ${distance}px)` }
            case 'bottom': return { top: `calc(100% + ${distance}px)` }

            default: return { left: `calc(100 % + ${distance}px)` }
        }
    }, [])

    return (
        <div style={style} className={`tooltip ${direction}`} > {title}</ div>
    )
}

export default Tooltip
