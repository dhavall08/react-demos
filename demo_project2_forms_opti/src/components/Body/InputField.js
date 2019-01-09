import React from 'react';

const InputField = (props) => {
    return (
        <div>
            <input className="form" autoComplete="off"
                style={{ background: 'white', borderWidth: '2px', border: 'ff4b4b' }}
                name={props.name}
                type={props.type}
                placeholder={props.place || props.name /* if value not passed of placeholder */}
                value={props.value}
                onBlur={e => props.blurevent(e.target.value, props.name)}
                required />
        </div>
    );
}

export default InputField;
