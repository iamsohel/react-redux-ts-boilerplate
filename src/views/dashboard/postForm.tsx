import React, {useState} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
interface Props {
   match: {
       params: {
           id:  any
       },
       url: string,
       path: string,
       isExact: boolean,

   },
   history: any,
}

 const PostForm = ({match, history }: Props) => {
    console.log(match, history)
    const [title, setTitle] = useState('');
     const [body, setBody] = useState('');
     const dispatch = useDispatch();

     const { addMovie } = useActions();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data ={
            title: "Comedy 150",
            genreId: "6047570627e97130a02abc2e",
            numberInStock: 50,
            dailyRentalRate: 60
        }
        if( match.params.id === 'new'){
           // await savePost(data);
          addMovie(data, history)
        } else {
           // await savePost({...data, id: match.params.id});
        }
        history.push("/");
    }

    const getPostData = async (id: number) => {
        //const { data } = await getPost(id);
        //setTitle(data.title);
        //setBody(data.body);
    }

    React.useEffect(() => {
        if( match.params.id !== 'new'){
            getPostData(match.params.id)
        }
    }, [match.params.id]);

    return(
        <Row style={{marginTop: '300px'}}>
            <Col md={{ span: 6, offset: 3 }} style={{border: '2px solid blue', padding: '15px'}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Post Description</Form.Label>
                        <Form.Control type="text" value={body} placeholder="Description" onChange={e => setBody(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default PostForm;