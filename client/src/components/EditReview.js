import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import ReviewService from "../services/review.service";
import AuthService from "../services/auth.service";

const EditReview = ({ id, location, description, rating, images }) => {
  const currentUser = AuthService.getCurrentUser();

  const initialReviewState = {
    location: location,
    description: description,
    images: images,
    rating: rating,
  };

  const [form, setForm] = useState(initialReviewState);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const updateReview = () => {
    var data = {
      location: form.location,
      description: form.description,
      rating: form.rating,
      images: form.images,
    };

    ReviewService.updateReview(id, data)
      .then((response) => {
        setForm({
          username: currentUser.username,
          location: response.data.location,
          description: response.data.description,
          rating: response.data.rating,
          images: response.data.images,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Toilet Location</Form.Label>
          <Form.Control
            name="location"
            id="location"
            value={form.location}
            onChange={updateForm}
            type="text"
            placeholder="Enter location of toilet"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            id="description"
            value={form.description}
            onChange={updateForm}
            type="text"
            placeholder="Enter description"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            name="rating"
            id="rating"
            value={form.rating}
            onChange={updateForm}
            type="number"
            placeholder="Enter rating"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Iamges</Form.Label>
          <Form.Control
            name="images"
            type="file"
            multiple
            id="images"
            value={form.images}
            onChange={updateForm}
          />
        </Form.Group>
        <Button onClick={updateReview} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditReview;
