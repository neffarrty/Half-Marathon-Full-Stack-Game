export default function FormField({ title, type, name, onChange }) {
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
        </label>
    );
};