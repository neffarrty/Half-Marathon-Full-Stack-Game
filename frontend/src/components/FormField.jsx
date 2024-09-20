import Error from './Error';

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
            <Error error={error} />
        </label>
    );
};