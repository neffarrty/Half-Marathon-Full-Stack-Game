export default function Error({ error }) {
    return error && <div className='error-message'>{error}</div>;
};