import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import { getPosts, deletePost } from '../../services/postService';
import { Link } from 'react-router-dom';

interface Posts{
    id: number,
    title: string,
    body: string,
    userId: number
}

const Dashboard : React.FC = () =>  {
    const [post, setPost] = React.useState<Posts[]>([]);

    const getPost = async () => {
        const {data} = await getPosts();
        console.log("data:, ", data)
        setPost(data)
    }

    React.useEffect(()=> {
        getPost();
    }, []);

    const handleDelete = async (id: number) => {
        await deletePost(id);
        const posts = post.filter(p => p.id !== id);
        setPost(posts)
    }

    return(
        <>
            {post.length > 0 && (
                <>
                    <Card className="text-center" style={{marginTop: '50px'}}>
                        <Card.Header>Demo App</Card.Header>
                    </Card>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>Post Title</th>
                            <th>Description</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.length > 0 && post.map(p => (
                                <tr key={p.id}>
                                    <td>{p.title}</td>
                                    <td>{p.body}</td>
                                    <td>
                                        <Link to={`/form/${p.id}`} ><Button variant="success">Update</Button></Link>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                 </>
            )}
            {post.length === 0 && (
                <p>Loading...</p>
            )}
            
        </>
    )
}

export default Dashboard;