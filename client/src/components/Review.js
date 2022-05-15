import { Card, Button } from 'react-bootstrap';
import toiletpic from '../resources/images/temp-toilet.jpeg';

const Review = ({ account, date, toiletlocation, review, photos}) => {
    return (
        <Card className="w-50">
            <Card.Img variant="top" src={toiletpic} />
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