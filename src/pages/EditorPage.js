import React, { useState, useRef, useEffect } from 'react';
import ACTIONS from '../Actions';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';






const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [okMessageSent, setOkMessageSent] = useState(false);
    





    
    const toastId = React.useRef(null); 

    useEffect(() => {
        const init = async () => {
            console.log(location.state?.roomType);
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            socketRef.current.on('ok-message', (username) => {
                console.log(username);
                if(! toast.isActive(toastId.current)) {
                    toastId.current = toast(username);
                  }

                /*if (!toast.isActive(username)) { // Check if a similar toast is not already active
                    toast.success(username , { autoClose: 400 });
                }*/
                setOkMessageSent(true);
              });
            
              

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
                roomType: location.state?.roomType,
                
            } );

            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId, roomref }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );


            // Listening for disconnected
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    }, []);

    

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    const handleButtonClick = () => {
        //let message = prompt("Enter Custom Message");
        let message = 'is Typing..';
        const username = location.state?.username;
        socketRef.current.emit('send-ok', username + ' message: ' + message);
      };

      const handleButtonClick2 = () => {
        let message = prompt("Enter Custom Message");
        const username = location.state?.username;
        socketRef.current.emit('send-ok', username + ' message: ' + message);
      };
      



    const span1 = '<span style="--i:11;"></span><span style="--i:12;"></span><span style="--i:21;"></span><span style="--i:29;"></span><span style="--i:26;"></span><span style="--i:28;"></span><span style="--i:17;"></span><span style="--i:27;"></span><span style="--i:18;"></span><span style="--i:26;"></span><span style="--i:19;"></span><span style="--i:24;"></span><span style="--i:12;"></span><span style="--i:21;"></span><span style="--i:15;"></span><span style="--i:11;"></span>';


    return (
    
       


        <div className='containerEditor'>
        <div className="mainWrap">
            
            <div className="aside">
            <div className='bubblesEditor' dangerouslySetInnerHTML={{__html: span1}}>
                
                

                </div>
                <div className="asideInner">
                  
                    <div className="logo">
                        <h2>COLLAB-SHARE</h2>
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>


             {/*   
  <button className="btn raiseBtn" onClick={handleButtonClick}>
    Raise
  </button>*/}
 <button className="btn raiseBtn" onClick={handleButtonClick2}>
    Raise
  </button>

  
   
  
            </div>
            



            

            
            <div className="editorWrap" onKeyPress={handleButtonClick}>
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
            </div>

            <div className='smallScreen'>

            
            
                <h1>Please switch to desktop or use a system. This webapp works best on big screen.....</h1>
                </div>
            
        </div>
        <ToastContainer />
        </div>
        



    );
};



export default EditorPage;
