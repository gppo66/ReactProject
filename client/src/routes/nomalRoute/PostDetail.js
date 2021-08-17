import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {} from 'react-helmet';
import { Button, Col, Row } from 'reactstrap';
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUEST,
} from '../../redux/types';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { PostDetail, creatorId, title, loading } = useSelector(
    (state) => state.post,
  );
  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  }, []);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem('token'),
      },
    });
  };

  const EditButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            ← Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete Post
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const HomeButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            ← Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
  return <div>Post Detail</div>;
};

export default PostDetail;
