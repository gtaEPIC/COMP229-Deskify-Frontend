import React from "react";
import {isAuthenticated} from "../pages/login-helper";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

const AddComment = ({ ticket, cb }) => {
    const [comment, setComment] = React.useState('');
    const [showComment, setShowComment] = React.useState(false);

    const handleComment = async () => {
        try {
        if (!isAuthenticated()) return alert('Please login to add comments');
        // Send a POST request to add the comment
        const response = await fetch(`${apiURL}/ticket/${ticket}/comment`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
            },
            body: JSON.stringify({comment})
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
            console.log('Comment added successfully!');
            setComment('');
            if (cb) {
            cb();
            }
        } else {
            // Handle error cases
            console.error('Failed to add comment:', await response.text());
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div className={"mt-3"}>
        <div className={"input-group mb-3 " + (!showComment ? "hide" : "")}>
            <input type="text" className="form-control" placeholder="Add comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handleComment} className="btn btn-primary">Add</button>
        </div>
        <button onClick={() => setShowComment(!showComment)} className="btn btn-success w-100">{showComment ? "Hide" : "Add Comment"}</button>
        </div>
    );
}

export default AddComment;