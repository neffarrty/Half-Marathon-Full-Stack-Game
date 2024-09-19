export default function FormField({ title, type, name, onChange, error }) {
    const handleChange = (e) => {
        onChange(e.target);
    };
    
    return (
        <label>
            <span>{title}</span>
            <input
                type={type} 
                name={name} 
                onChange={handleChange}
            />
            { error && <div className='error-message'>{ error }</div> }
        </label>
    );
};