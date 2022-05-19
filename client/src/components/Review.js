import { Card, Button } from 'react-bootstrap';
import toiletpic from '../resources/images/temp-toilet.jpeg';
import "./Review.css";

const Review = ({ account, date, toiletlocation, review, photos}) => {
    return (
        <Card className="w-50">
            <Card.Header>
                <Card.Text>Location</Card.Text>
                <Card.Text>Stars</Card.Text>
            </Card.Header>
            <Card.Img variant="top" src={toiletpic} />
            <Card.Body>
                <Card.Text>Account </Card.Text>
                <Card.Text>Date</Card.Text>
                <Card.Text>
                    Review Text
                </Card.Text>
                <Button variant="link">Comments</Button>
            </Card.Body>
        </Card>
    )
}

export default Review;