import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import ReviewService from "../services/review.service";

const NewReview = () => {

  const initialReviewState = {
    toiletlocation: "",
    review: "",
    rating: "",
    photos: "",
  }
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialReviewState);

  const updateForm = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitReview = () => {
    var data = {
        toiletlocation: form.toiletlocation,
        review: form.review,
        rating: form.rating,
        photos: form.photos,
    };

    ReviewService.create(data)
      .then(response => {
        setForm({
          toiletlocation: response.data.toiletlocation,
          review: response.data.review,
          rating: response.data.rating,
          photos: response.data.photos
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
/* dont need this i think
  const newReview = () => {
    setForm(initialFormState);
    setSubmitted(false);
  };
  */

  return (
    <div>
         <Form>
            <Form.Group className="mb-3">
                <Form.Label>Toilet Location</Form.Label>
                <Form.Control name="toiletlocation" id="toiletlocation" value={form.toiletlocation} onChange={updateForm} type="text" placeholder="Enter location of toilet" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Review</Form.Label>
                <Form.Control name="review" as="textarea" rows={3} id="review" value={form.review} onChange={updateForm} type="text" placeholder="Enter review"/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control name="rating" id="rating" value={form.rating} onChange={updateForm} type="text" placeholder="Enter rating" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Photos</Form.Label>
                <Form.Control name="photos" type="file" multiple id="photos" value={form.photos} onChange={updateForm} />
            </Form.Group>
            <Button onClick = {submitReview} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );
};

export default NewReview;