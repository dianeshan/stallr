import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

import AuthService from "../services/auth.service";
import UploadService from "../services/upload.service";

const EditProfile = ({ onSubmit, handleClose }) => {
  const currentUser = AuthService.getCurrentUser();
  const [bio, setBio] = useState(currentUser.bio);
  const [pfp, setPfp] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const progressInfosRef = useRef(null);

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
            onChange={(e) => {
              setPfp(e.target.value);
              selectFiles(e);
            }}
          />
        </Form.Group>
        <p></p>
        <Button
          variant="primary"
          onClick={(e) => {
            uploadFiles();
            onSubmit(bio, pfp);
            handleClose();
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;
