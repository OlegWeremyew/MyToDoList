import React, {useState} from 'react';

type PropsType = {
    title: string
}


export const Span = ({title, ...props}: PropsType) => {

    const [status, setStatus] = useState<boolean>(false)

    const StatusTrue = () => {
        setStatus(true)
    }

    const onBlurHandler = () => {
        setStatus(false)
    }
    return (
        status ?
            <input
                onBlur={onBlurHandler}
                value={title} autoFocus/> :
            <span onDoubleClick={StatusTrue}>{title}</span>
    );
};
