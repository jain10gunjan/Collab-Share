import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const [roomType, setRoomType] = useState('writeAll'); //default room type is writeAll
    
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
                roomType
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
    };

    

    // dangerouslySetInnerHTML={{__html: span1}}

    return (
        <div className='container'>
            <div className='bubbles'>
            </div>
            <div className="homePageWrapper">
                <div className="formWrapper">
                    <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                    <div className="inputGroup">
                        <input
                            type="text"
                            className="inputBox"
                            placeholder="ROOM ID"
                            onChange={(e) => setRoomId(e.target.value)}
                            value={roomId}
                            onKeyUp={handleInputEnter}
                        />
                        <input
                            type="text"
                            className="inputBox"
                            placeholder="USERNAME"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            onKeyUp={handleInputEnter}
                        />
                        <div className="radioGroup">
                            <label>
                                <input
                                    type="radio"
                                    value="writeAll"
                                    checked={roomType === "writeAll"}
                                    onChange={handleRoomTypeChange}
                                />
                                Write All
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="writeCreator"
                                    checked={roomType === "writeCreator"}
                                    onChange={handleRoomTypeChange}
                                />
                                Write Creator Only
                            </label>
                        </div>
                        <button className="btn joinBtn" onClick={joinRoom}>
                            Join
                        </button>
                        <span className="createInfo">
                            No Room No Problem, Just Create One &nbsp;
                            <a
                                onClick={createNewRoom}
                                href=""
                                className="createNewBtn"
                            >
                                new room
                            </a>
                        </span>
                    </div>
                </div>
                <footer>
                    <h4 className='footerText'>
                        Built By THE TEAM OF 4.
                    </h4>
                </footer>
            </div>
        </div>
    );
};

export default Home;
