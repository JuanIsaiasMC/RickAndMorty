import axios from 'axios';

import { useEffect, useState } from 'react';

const ResidentInfo = ({ character }) => {

    const [characterData, setCharacterData] = useState({})

    useEffect(() => {
        axios.get(`${character}`)
            .then(res => setCharacterData(res.data))
    }, [])

    console.log(characterData)


    return (
        <li className='resident__info'>
            <h2 className='resident__title'>{characterData.name}</h2>
            <img className='resident__img' src={characterData.image} alt="" />
            <p className={`resident__status ${characterData.status === 'Alive' ? 'bgr-alive' : 'bgr-dead'}`}>{characterData.status}</p>
            <p className='resident__text'>{characterData.origin?.name}</p>
            <p className='resident__text'>episode number: {characterData.episode?.length}</p>
        </li>
    );
};

export default ResidentInfo;