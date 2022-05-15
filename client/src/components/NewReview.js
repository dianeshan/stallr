import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
 
export default function NewReview() {
 const [form, setForm] = useState({
    toiletlocation: "",
    review: "",
    rating: "",
    photos: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newReview = { ...form };
 
   await fetch("http://localhost:5000/review/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newReview),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ toiletlocation: "", review: "", rating: "", photos: "" });
   navigate("/");
 }
 
 return (
     <div>
         <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Toilet Location</Form.Label>
                <Form.Control id="toiletlocation" value={form.toiletlocation} onChange={(e) => updateForm({ toiletlocation: e.target.value })} type="text" placeholder="Enter location of toilet" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Review</Form.Label>
                <Form.Control as="textarea" rows={3} id="review" value={form.review} onChange={(e) => updateForm({ review: e.target.value })} type="text" placeholder="Enter review"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Rating</Form.Label>
                <Form.Control id="rating" value={form.rating} onChange={(e) => updateForm({ rating: e.target.value })} type="text" placeholder="Enter rating" />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Photos</Form.Label>
                <Form.Control type="file" multiple id="photos" value={form.photos} onChange={(e) => updateForm({ photos: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
 );
}