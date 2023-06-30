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

    return (
        <section className={styles.container}>
            <h1>Users</h1>
            <button onClick={toggleSortUsersAsc}>Sort by Username ascending</button>
            <button onClick={toggleSortUsersDesc}>Sort by Username descending</button>

            <div className={styles.users}>
                {users.length > 0 && users.map((user: IUser) => (
                    <div key={user.id} className={styles.user}>
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.email}>{user.email}</p>
                        <p className={styles.city}>city:{user.address.city}</p>
                        <p className={styles.phone}>{user.phone}</p>
                        <button className={styles.album}
                            onClick={() => handleAlbumClick(user.id)}>
                            <Link to={`/users/${user.id}/albums`}>Show Album</Link>
                        </button>
                        <button className={styles.posts}
                            onClick={() => handlePostClick(user.id)}>
                            <Link to={`/users/${user.id}/posts`}>Show Posts</Link>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Users
