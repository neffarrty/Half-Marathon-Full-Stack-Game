export default function ActionBar({ actions }) {
    return (
        <div className='action-bar'>
            {actions.map(action => {
                return <Action action={action}/>
            })}
        </div>
    );
};