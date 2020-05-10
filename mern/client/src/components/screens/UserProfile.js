import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userId } = useParams()

    useEffect(() => {
        fetch('/user/' + userId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setUserProfile(result)
            })
    }, [])

    return (
        <>
            {userProfile ?
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
                                src="https://lh3.googleusercontent.com/EWew-IutDToENa46WAYdkqtmtbGEoqwzcM89f4DiUb27MjuDOrBvl9iVclbRzu-u6CoLxikkPLjrl0ElNwFPReAGnxJDZGcaXgsF5ONvQrP4yn2fRV2rLK111A3wl08a56Eww0EFfLlNSMT-t5ei0cSzTQ_OYJCq3F0kHtZgVCX2kOD-3ifk2LyjMMljSeTLMZBWY9j_RdzfeHgjinsvsuRp9LzTfrZm6dXHEZK6jRC0KkQ3kalRUaEGzNPFxmX9OsXQ5u31tniNpS77k22jqKKRMH76Y2gf4WmCDphUjzme_1z69cc3vlEYzQOpsTIYXo6QAHmdiWWFQbcHNVlXuRvNWChv_H9OyyL4Rk2E-PjDMNLGMeE_F4fE_A6PtFa7NFQq-GwMAXTIqJ0wqWHeGVqdZNZN-vxz4ZLykGN6TUfDrkvDiq-WdxVVjV7992oDY5gLP-U5UrZvVEMwxontakQvCRfWNUBkwOf8ioryU7g7DDraxFEa26NYUxOhy_J287DZjnp_aL_12hHqIuKhcG7kVb9oNuKbhlJOdCidvN4kW4FHQSSQVHZWuWXcvtlRBl6X8RbF0HEWftuCUrBvjzzeOmVTjfU_uWSCawtZbmN8yuDFpyORQmArm7_OPWACP51rg4dId57xttkLGAUdkU68ip6ePls1j_9mINkhGy02VZcaBvM3ncBJmzxsXg=s675-no?authuser=0"
                            />
                        </div>

                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "108%",
                                }}
                            >
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>470 followers</h6>
                                <h6>465 following</h6>
                            </div>
                        </div>
                    </div>

                    <div className="gallery">
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                )
                            })
                        }
                    </div>

                </div>

                : <h2>Loading...</h2>}
        </>
    );
};

export default UserProfile;
