import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { IAlbum } from '../../interfaces';
import { fetchAlbums } from '../../store/slices/usersSlice';
import styles from './UserAlbums.module.css';

const UserAlbums = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.users);
    const user = users.find(user => user.id === Number(userId));

    if (userId && !user?.albums) {
        dispatch(fetchAlbums(Number(userId)));
    }

    if (!user) {
        return <div className='loading'>loading</div>;
    }

    return (
        <section className="container">
            <header>
                <h2 className="header">User Albums</h2>
                <p className="header-name">User: {user.name}</p>
            </header>
            <main>
                <ul>
                    {user.albums && user.albums.map((album: IAlbum) => (
                        <li key={album.id} className={styles.title} >
                            {album.title}
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    );
};

export default UserAlbums;
