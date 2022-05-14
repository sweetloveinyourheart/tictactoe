import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../contexts/auth';
import { useSocket } from '../../contexts/socket';
import './invite-modal.css'

interface InviteRes {
    message: string
    data: { inviter: string } | null
}

const customStyles = {
    content: {
        top: '30%',
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
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [inviter, setInviter] = useState("A")

    const { user } = useAuth()
    const { socket } = useSocket()

    useEffect(() => {
        socket?.on('match-request', (payload: InviteRes) => {
            if (payload.data) {
                setIsOpen(true)
                setInviter(payload.data.inviter)
            }
        })
    }, [socket])

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
                        <button className='denied-btn'> Denied </button>
                        <button className='accept-btn'> Accept </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}