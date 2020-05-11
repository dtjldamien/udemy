import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import M from "materialize-css";

const FollowingPosts = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        console.log(data);
        fetch("/getFollowingPosts", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setData(result.posts);
            });
    }, []);

    // id is the id of the post
    const likePost = (id) => {
        console.log(id)
        fetch('like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    // id is the id of the post
    // id is the id of the post
    const unlikePost = (id) => {
        fetch('unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)

                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const deletePost = (postId) => {
        fetch('deletePost/' + postId, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
                M.toast({ html: "Successfully deleted your post!", classes: "#43a047 green darken-3" });
            })
    }

    const deleteComment = (postId, commentId) => {
        M.toast({ html: "Delete comment functionality not up!", classes: "#ff6f00 amber darken-4" });
        /*
        fetch('deleteComment/' + postId + '/' + commentId, {
          method: "delete",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        }).then(res => res.json())
          .then(result => {
            console.log(result)
            const newData = data.filter(item => {
              return item._id !== result._id
            })
            setData(newData)
            M.toast({ html: "Successfully deleted the comment!", classes: "#43a047 green darken-3" });
          })
          */
    }

    // if photo is posted by the user, go to my profile
    // <h5><Link to={item.postedBy._id !== state._id  
    //   ? "/profile/" + item.postedBy._id
    //   : "/profile"}>

    // {item.likes.includes(state._id)?if:else} checks if photo is already liked by the current user, if liked, display unlike, else display like
    return (
        <div className="home">
            {data.map((item) => {
                return (
                    <div className="card home-card" key={item._id}>
                        <div>
                            <img
                                style={{ padding: "5px", width: "40px", height: "40px", borderRadius: "20px" }}
                                src={item.postedBy.displayPhoto}
                            />
                            <h5 style={{ padding: "5px" }}><Link to={item.postedBy._id !== state._id
                                ? "/profile/" + item.postedBy._id
                                : "/profile"}>
                                {item.postedBy.name}</Link>
                                {item.postedBy._id == state._id &&
                                    <i className="material-icons"
                                        style={{ float: "right" }}
                                        onClick={() => {
                                            deletePost(item._id)
                                        }}>delete</i>
                                }
                            </h5>
                        </div>
                        <div className="card-image">
                            <img src={item.photo} />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: "red" }}>favorite</i>
                            {item.likes.includes(state._id)
                                ?
                                <i className="material-icons" onClick={() => { unlikePost(item._id) }}>thumb_down</i>
                                :
                                <i className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>
                            }
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record => {
                                    return (
                                        <h6 key={record._id}>
                                            <span style={{ fontWeight: "500" }}>
                                                {record.postedBy.name}
                                            </span>
                                            {record.text}
                                            {record.postedBy._id == state._id &&
                                                <i className="material-icons"
                                                    style={{ float: "right" }}
                                                    onClick={() => {
                                                        deleteComment(item._id, record._id)
                                                    }}>delete</i>
                                            }
                                        </h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault() // prevent  refresh on submit
                                makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder="Leave a comment!" />
                            </form>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FollowingPosts;
