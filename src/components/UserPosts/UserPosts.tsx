import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import { IPost } from '../../interfaces';

const UserPosts = () => {
    const { userId } = useParams();
    const users = useAppSelector(state => state.users.users);
    const user = users.find(user => user.id === Number(userId));

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Posts</h2>
            <p>User: {user.name}</p>
            <div>
                {user.posts && user.posts.map((post: IPost) => (
                    <div key={post.id}>
                        <p>Title: {post.title}</p>
                        <p>Body: {post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPosts;
