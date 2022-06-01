import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import AuthService from "../services/auth.service";

const EditProfile = ({ onSubmit, handleClose }) => {
  const currentUser = AuthService.getCurrentUser();
  const [bio, setBio] = useState(currentUser.bio);
  const [pfp, setPfp] = useState("");

  return (
    <Form encType="multipart/form-data">
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          placeholder="Choose pfp"
          value={pfp}
          onChange={(e) => setPfp(e.target.value)}
        />
      </Form.Group>
      <p></p>
      <Button
        variant="primary"
        onClick={(e) => {
          onSubmit(bio, pfp);
          handleClose();
        }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default EditProfile;
