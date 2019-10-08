import React from 'react';

export default function PageWrapper({cloudy, children}){
    const wrapperOpacity = cloudy ? (cloudy * 0.01) :0 ;

    return(
        <div style={
            {
                height: '100%',
                minHeight: '100vh',
                width: '100%',
                minWidth: '100vw',
                backgroundColor:`rgba(100,100,0, ${wrapperOpacity})`
            }
        }>
            <div className='PageWrapper'>{children}</div>
        </div>
    )
}
