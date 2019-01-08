import React from 'react';

const InputField = (props) => {
    return (
        <div>
            <input className="form" autoComplete="off" id={props.id} type={props.type} style={{ background: 'white', borderWidth: '2px', border: 'ff4b4b' }} placeholder={props.place} onBlur={e => props.blurevent(e.target.value, props.id)} value={props.value} required />
        </div>
    );
}

export default InputField;
