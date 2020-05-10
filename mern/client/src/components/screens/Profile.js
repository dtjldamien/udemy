import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App'

const Profile = () => {
  const [myPhotos, setMyPhotos] = useState([])
  const { state, dispatch } = useContext(UserContext)
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

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
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

      <div className="gallery">
        {
          myPhotos.map(item => {
            return (
              <img key={item._id} className="item" src={item.photo} alt={item.title} />
            )
          })
        }
      </div>
    </div>
  );
};

export default Profile;
