import { UserContext } from './UserContext';
import useUser from '../../hooks/useUser';

export default function UserContextProvider({ children }) {
    const { user, saveUser } = useUser();

    return (
        <UserContext.Provider value={{ user, saveUser }}>
            {children}
        </UserContext.Provider>
    );
};