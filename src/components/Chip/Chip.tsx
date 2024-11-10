import './Chip.css';
import React from 'react'

type Props = {
    email: string;
    onRemoveClick: (email: string) => void;
}

export const Chip: React.FC<Props> = ({ email, onRemoveClick }: Props) => (
    <div className='chip'>
        <span className='chipText'>{email}</span>
        <button onClick={() => onRemoveClick(email)}>x</button>
    </div>
);