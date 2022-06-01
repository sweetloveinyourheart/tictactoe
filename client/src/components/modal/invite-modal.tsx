import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import { useSocket } from '../../contexts/socket';
import './invite-modal.css'

interface InviteRes {
    message: string
    data: { inviter: string, roomId: string } | null
}

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)"
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function InviteModal() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [inviter, setInviter] = useState("A")
    const [roomId, setRoomId] = useState("")

    const { user } = useAuth()
    const { socket } = useSocket()

    const navigate = useNavigate()

    useEffect(() => {
        socket?.on('match-request', (payload: InviteRes) => {
            if (payload.data) {
                setIsOpen(true)
                setInviter(payload.data.inviter)
                setRoomId(payload.data.roomId)
            }
        })

        socket?.on('match-response', (payload) => {
            if(payload?.data) {
                navigate(`/playground?matchId=${payload.data.matchId}`)
            } else {
                setIsOpen(false)
            }
        })
    }, [socket])

    const onAccept = useCallback(() => {
        setIsOpen(false)
        socket?.emit('match-accept', {
            roomId,
            competitor: inviter
        })
    }, [roomId])

    const onReject = useCallback(() => {
        setIsOpen(false)
        socket?.emit('match-denied', {
            roomId
        })
    }, [roomId]) 

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="invite-modal">
                <div className='modal-header'>
                    <h5>Match Invitation !</h5>
                    <button onClick={closeModal}>
                        <i className="far fa-times-circle"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="friend">
                        <div className="friend__avatar">
                            {inviter[0]}
                        </div>
                        <div className="friend__name">
                            {inviter}
                        </div>
                    </div>
                    <p>Hey {user?.username}, Let's make a funny match with me !</p>
                </div>
                <div className='modal-footer'>
                    <div className='actions'>
                        <button className='denied-btn' onClick={() => onReject()}> Reject </button>
                        <button className='accept-btn' onClick={() => onAccept()}> Accept </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}