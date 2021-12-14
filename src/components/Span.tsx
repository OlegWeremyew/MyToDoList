import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (title: string) => void
}

export const Span = (props: PropsType) => {

        const [status, setStatus] = useState<boolean>(false)
        let [localtitle, setLocalTitle] = useState(props.title)

        const StatusTrue = () => {
            setStatus(true)
        }

        const onBlurHandler = () => {
            setStatus(false)
            props.callBack(localtitle)
        }

        const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newTitle = e.currentTarget.value
            setLocalTitle(newTitle)
        }

        return (
            status ?
                <input
                    onChange={onchangeHandler}
                    onBlur={onBlurHandler}
                    value={localtitle} autoFocus/> :
                <span onDoubleClick={StatusTrue}>{props.title}</span>
        );
    }
;
