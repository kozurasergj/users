import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { IAlbum } from '../../interfaces';

const UserAlbums = () => {
    const { userId } = useParams();
    const users = useAppSelector(state => state.users.users);
    const user = users.find(user => user.id === Number(userId));

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Albums</h2>
            <p>User: {user.name}</p>
            <div>
                {user.albums && user.albums.map((album:IAlbum) => (
                <div key={album.id}>
                    <p>Title: {album.title}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default UserAlbums;
