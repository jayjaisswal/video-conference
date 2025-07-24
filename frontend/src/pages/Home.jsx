import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
// import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navBar">
        <div className="text-2xl m-5  font-bold text-red-600 tracking-wide cursor-pointer">
          <h2>TalkSphere</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Logged out successfully");
              setTimeout(() => {
                navigate("/auth");
              }, 100); // tiny delay so toast shows
            }}
          >
            Logout
          </Button>
        </div>
      </div>
<div className="meetContainer flex flex-col md:flex-row items-center justify-between p-6 gap-10">
  {/* Left Panel */}
  <div className="leftPanel w-full md:w-1/2 space-y-6">
    <h2 className="text-3xl font-semibold text-gray-800">
      Providing Quality Video Call<br />Just Like Quality Education
    </h2>

    <div className="flex gap-4">
      <TextField
        onChange={(e) => setMeetingCode(e.target.value)}
        id="outlined-basic"
        label="Meeting Code"
        variant="outlined"
        fullWidth
      />
      <Button onClick={handleJoinVideoCall} variant="contained" color="primary">
        Join
      </Button>
    </div>
  </div>

  {/* Right Panel */}
  <div className="rightPanel w-full md:w-1/2 flex justify-center">
    <img
      src="/undraw.png"
      alt="Meeting Illustration"
      className="max-w-full h-auto"
    />
  </div>
</div>

    </>
  );
}

export default withAuth(HomeComponent);
