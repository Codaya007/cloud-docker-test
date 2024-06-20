import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LIMIT_PAGINATOR } from '../../hooks/Constants';

const Loader = () => {

    return (
        <div className="loader-container">
            <div className="loader"></div>
            <div className="loading-text">Cargando<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span></div>
        </div>
    );
};

export default Loader;
