import './ChipList.css';
import React from 'react';
import { Chip } from '../Chip';

type Props = {
    emails: string[];
    onRemoveClick: (email: string) => void;
};

export const ChipList: React.FC<Props> = ({ emails = [], onRemoveClick }: Props) => {
    let emailsToShow: string[] = emails;
    let emailsToHide: string[] = [];
    if (emails.length > 5) {
        emailsToShow = emails.slice(0, 5);
        emailsToHide = emails.slice(5);
    }
    return (
        <div className='chipList'>
            {emailsToShow.length > 0 && emailsToShow.map((email: string, index: number) => (
                <Chip key={`${index}_${email}`} email={email} onRemoveClick={onRemoveClick} />
            ))}
            {emailsToHide.length > 0 && (
                <>
                    <div className='counterContainer'>
                        <span className='counter'>{emailsToHide.length}</span>
                    </div>
                    <div className='hideList'>
                        {emailsToHide.map((email: string, index: number) => (
                            <Chip key={`${index}_${email}`} email={email} onRemoveClick={onRemoveClick} />
                        ))}
                    </div>
                </>
            )}
            {/* {emailsToHide.length > 0 && (
                <div className='hideList'>
                    {emailsToHide.map((email: string, index: number) => (
                        <Chip key={`${index}_${email}`} email={email} onRemoveClick={onRemoveClick} />
                    ))}
                </div>
            )} */}
        </div>
    );
};