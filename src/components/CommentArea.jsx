import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${props.asin}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWRhMjRjNTllYzAwMTk5MGQ2ZmUiLCJpYXQiOjE3MTA3NzE0NjksImV4cCI6MTcxMTk4MTA2OX0.Eum5wjIMpLc2oISsKRoUvXwWj_U3MhsOwH-CW9BHea0",
          },
        });
        if (response.ok) {
          const commentsData = await response.json();
          setComments(commentsData);
          setIsLoading(false);
          setIsError(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (props.asin) {
      fetchComments();
    } else {
      setComments([]);
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
