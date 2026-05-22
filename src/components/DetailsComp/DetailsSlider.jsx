import React from 'react'
import { getFallbackImage, getPhotoImage } from '../../eventUtils'

const DetailsSlider = ({ photo, event }) => {
    return (
        <div className='w-[320px] md:w-[840px] h-full m-auto flex items-center justify-center object-cover'>
            <img
                className='w-[320px] md:w-[800px] h-[240px] md:h-[420px] object-cover rounded-xl'
                src={getPhotoImage(photo, event)}
                alt={event?.eventName || "Event"}
                onError={(e) => {
                    e.currentTarget.src = getFallbackImage(event);
                }}
            />
        </div>
    )
}

export default DetailsSlider
