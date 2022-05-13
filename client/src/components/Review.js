import { Card, Button } from 'react-bootstrap';

function Review() {
    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Text>Account Date Location</Card.Text>
                <Card.Text>Stars</Card.Text>
                <Card.Text>
                    Review Text
                </Card.Text>
                <Button variant="link">Comments</Button>
            </Card.Body>
        </Card>

    )
}

export default Review;