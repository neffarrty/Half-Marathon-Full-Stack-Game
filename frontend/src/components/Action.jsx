import '../styles/Action.css'

export default function Action({ action }) {
    return (
        <div className='action-container'>
            <span>{action.name}</span>
        </div>
    );
}