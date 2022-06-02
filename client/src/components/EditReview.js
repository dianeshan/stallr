import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

import ReviewService from "../services/review.service";
import AuthService from "../services/auth.service";
import UploadService from "../services/upload.service";

const EditReview = ({ id, location, description, rating, images }) => {
  const currentUser = AuthService.getCurrentUser();

  const initialReviewState = {
    location: location,
    description: description,
    images: images,
    rating: rating,
  };

  const [form, setForm] = useState(initialReviewState);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const progressInfosRef = useRef(null);

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const selectFiles = (e) => {
    setSelectedFiles(e.target.files);
    setProgressInfos({ val: [] });
  };

  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        console.log(file.name);
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        console.log(file.name);
      });
  };

  const uploadFiles = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map((file) => ({
      percentage: 0,
      fileName: file.name,
    }));

    progressInfosRef.current = {
      val: _progressInfos,
    };

    const uploadPromises = files.map((file, i) => upload(i, file));

    Promise.all(uploadPromises);
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
      {progressInfos &&
        progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            {progressInfo.percentage < 100 && (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + "%" }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            )}
          </div>
        ))}
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
          <Form.Label>Images</Form.Label>
          <Form.Control
            name="images"
            type="file"
            multiple
            id="images"
            // value={form.images}
            onChange={(e) => {
              updateForm(e);
              selectFiles(e);
            }}
          />
        </Form.Group>
        <Button
          onClick={(e) => {
            uploadFiles();
            updateReview();
          }}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditReview;
