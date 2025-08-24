import React from 'react';

type Status = 'idle' | 'correct' | 'incorrect';

interface EquationInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    status: Status;
    placeholder: string;
}

const EquationInput: React.FC<EquationInputProps> = ({ value, onChange, status, placeholder }) => {
    
    const getBorderColor = () => {
        switch (status) {
            case 'correct': return 'border-green-500 bg-green-100 text-green-800';
            case 'incorrect': return 'border-red-500 bg-red-100 text-red-800';
            default: return 'border-slate-300 focus:border-blue-500 focus:ring-blue-500';
        }
    }

    return (
        <input
            type="text" // Use text to allow for fractions, decimals, and signs
            inputMode="decimal" // Show numeric-friendly keyboard on mobile
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-label={`입력: ${placeholder}`}
            className={`w-20 sm:w-24 text-center bg-white border-2 rounded-md mx-1 sm:mx-2 transition-colors duration-200 text-xl sm:text-2xl p-1 font-mono ${getBorderColor()}`}
            autoComplete="off"
        />
    );
};

export default EquationInput;
