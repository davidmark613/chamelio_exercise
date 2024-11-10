import './EmailForm.css';
import React, { ChangeEvent, KeyboardEvent, ClipboardEvent, useState, FormEvent } from 'react';
import { ChipList } from '../ChipList';

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => EMAIL_REGEXP.test(email);

type Props = {
    initialEmails?: string[];
};

export const EmailForm: React.FC<Props> = ({ initialEmails = [] }: Props) => {
    const [inputValue, setInputValue] = useState("");
    const [emails, setEmails] = useState<string[]>(initialEmails);

    const emailChipExists = (email: string) => emails.includes(email);

    const addEmails = (emailsToAdd: string[]) => {
        const validatedEmails = emailsToAdd
            .map((e) => e.trim())
            .filter((email) => isValidEmail(email) && !emailChipExists(email));
        
        setEmails((prevState: string[]) => ([
            ...prevState, ...validatedEmails
        ]));
        setInputValue("");
    };

    const removeEmail = (email: string) => {
        setEmails((prevState: string[]) => {
            return prevState.filter((e: string) => e !== email);
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", "Tab", ","].includes(e.key)) {
            e.preventDefault();

            addEmails([inputValue]);
        }
    };

    const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData("text");
        const pastedEmails = pastedData.split(",");
        addEmails(pastedEmails);
    };

    const handleCloseClick = (email: string) => {
        removeEmail(email);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(emails);
        setEmails([]);
    };

    return (
        <form className='emailForm' onSubmit={handleSubmit}>
            <div className='inputBox'>
                <ChipList emails={emails} onRemoveClick={handleCloseClick} />
                <input 
                    type='email'
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste} 
                />
            </div>
            <button
                disabled={!emails.length}
            >
                {`Add Users ${emails.length > 0 ? `(${emails.length})` : ''}`}
            </button>
        </form>
    );
};