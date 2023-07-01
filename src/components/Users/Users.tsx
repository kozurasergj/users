import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { IUser } from '../../interfaces';
import { fetchAlbums, fetchPosts, sortByAcs, sortByDesc } from '../../store/slices/usersSlice';
import styles from './Users.module.css';


export const Users = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.users || []);

    const handleAlbumClick = (userId: number) => {
        dispatch(fetchAlbums(userId));
        navigate(`/users/${userId}/albums`);
    };

    const handlePostClick = (userId: number) => {
        dispatch(fetchPosts(userId));
        navigate(`/users/${userId}/posts`);
    };

    const toggleSortUsersAsc = () => {
        dispatch(sortByAcs());
    };

    const toggleSortUsersDesc = () => {
        dispatch(sortByDesc());
    };

    if (!users) {
        return <div className="loading">loading</div>;
    }

    return (
        <section className="container">
            <header>
                <h1 className="header">Users</h1>
                <button className="button-sort" onClick={toggleSortUsersAsc}>Sort by ascending</button>
                <button className="button-sort" onClick={toggleSortUsersDesc}>Sort by descending</button>
            </header>
            <main className={styles.users}>
                {users.length > 0 && users.map((user: IUser) => (
                    <div key={user.id} className={styles.user}>
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.email}>{user.email}</p>
                        <p className={styles.city}>city:{user.address.city}</p>
                        <p className={styles.phone}>{user.phone}</p>
                        <button className="button"
                            onClick={() => handleAlbumClick(user.id)}>
                            <Link to={`/users/${user.id}/albums`}>Show Album</Link>
                        </button>
                        <button className="button"
                            onClick={() => handlePostClick(user.id)}>
                            <Link to={`/users/${user.id}/posts`}>Show Posts</Link>
                        </button>
                    </div>
                ))}
            </main>
        </section>
    )
}

export default Users
