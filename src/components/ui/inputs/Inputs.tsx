import React from 'react';

type inputProps = {
    type?: string,
    name?: string,
    id?: string,
    placeholder?: string,
}

export const FormInput = ({type, name, id, placeholder}:inputProps) => {
    return (
        <input type={type} name={name} id={id} placeholder={placeholder} className={`px-5 py-2 rounded-sm outline-0 focus:ring-3 transition-all bg-black/5 dark:bg-white/10 focus:ring-pink-500/50`} />
    );
}
