import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App'

const Profile = () => {
  const [myPhotos, setMyPhotos] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [image, setImage] = useState("")

  console.log(state)
  useEffect(() => {
    fetch('/myposts', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result =>
        setMyPhotos(result.myPosts)
      )
  }, [])

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "udemy-mern");
      data.append("cloud_name", "dtjldamien");
      fetch("https://api.cloudinary.com/v1_1/dtjldamien/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // setUrl(data.url);
          // localStorage.setItem("user", JSON.stringify({ ...state, displayPhoto: data.url }))
          // dispatch({ type: "UPDATEDP", payload: data.url })
          fetch('/updateDp', {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              displayPhoto: data.url
            })
          }).then(res => res.json()
            .then(result => {
              console.log(result)
              localStorage.setItem("user", JSON.stringify({ ...state, displayPhoto: data.url }))
              dispatch({ type: "UPDATEDP", payload: result.displayPhoto })    
            }))
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image])

  const updateDisplayPhoto = (file) => {
    setImage(file)
  }

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.displayPhoto : ""}
          />
        </div>

        <div>
          <h4>{state ? state.name : "Loading"}</h4>
          <h5>{state ? state.email : ""}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{myPhotos.length} posts</h6>
            <h6>{state ? state.followers.length : "0"} followers</h6>
            <h6>{state ? state.following.length : "0"} following</h6>
          </div>
        </div>
      </div>

      <div className="file-field input-field" style={{ margin: "10px" }}>
        <div className="btn #64b5f6 blue darken-1">
          <span>Update DP</span>
          <input type="file" onChange={(e) => updateDisplayPhoto(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <div className="gallery">
        {
          myPhotos.map(item => {
            return (
              <img key={item._id} className="item" src={item.photo} alt={item.title} />
            )
          })
        }
      </div>
    </div >
  );
};

export default Profile;
