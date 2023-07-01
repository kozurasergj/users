import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { IPost } from '../../interfaces';
import styles from './UserPosts.module.css';

const UserPosts = () => {
    const { userId } = useParams();
    const users = useAppSelector(state => state.users.users);
    const user = users.find(user => user.id === Number(userId));

    if (!user) {
        return <div className="loading">loading</div>;
    }


    return (
        <section className="container">
            <header>
                <h2 className="header">User Posts</h2>
                <p className="header-name">User: {user.name}</p>
            </header>
            <main>
                <ul>
                    {user.posts && user.posts.map((post: IPost) => (
                        <li key={post.id} className={styles.title}>
                            <ul className='list'>
                                <li>Title: {post.title}</li>
                                <li>Body: {post.body}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </main>
        </section >
    );
};

export default UserPosts;
