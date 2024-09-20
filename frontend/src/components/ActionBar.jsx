import Action from './Action.jsx';
import '../styles/ActionBar.css';
import {useEffect, useRef} from "react";

export default function ActionBar({ actions }) {

    const actionBarRef = useRef(null);
    useEffect(() => {
        if(actionBarRef.current){
            actionBarRef.current.scrollTop = actionBarRef.current.scrollHeight;
        }
    }, [actions]);

    return (
        <div className='action-bar' ref={actionBarRef}>
            {actions.map((action,index) => {
                return <Action key={index} action={action}/>
            })}
        </div>
    );
};