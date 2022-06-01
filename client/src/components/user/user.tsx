import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import './user.css'
import { useAuth } from "../../contexts/auth";
import { UserInterface } from "../../types/user";
import axios from "axios";

interface UserProps {

}

const UserComponent: FunctionComponent<UserProps> = () => {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [friends, setFriends] = useState<UserInterface[]>([])
    const [stranger, setStranger] = useState<UserInterface[]>([])

    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            setFriends(user.friends)
        }
    }, [user])

    const onSearch = useCallback(async (e?: FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault()

        const { data } = await axios.get(`/api/user/search?name=${search}`)
        if (data.data && !data.error) {
            setStranger(data.data)
        }
    }, [search])

    const onAddFriend = useCallback(async (friend: UserInterface) => {
        const { data } = await axios.get(`/api/user/friend/add/${friend._id}`)
        if (data.data && !data.error) {
            setIsSearching(false)
            setFriends(s => [...s, friend])
        }
    }, [])

    const renderFriends = () => {
        let result;
        if (friends) {
            result = friends.map((friend, index) => {
                return (
                    <div className="friend-list__item" key={index}>
                        <i className="far fa-user-circle"></i>
                        <p> {friend.fullname} </p>
                    </div>
                )
            })
        }
        return result;
    }

    const renderStranger = () => {
        return stranger.map((friend, index) => {
            return (
                <div className="stranger" key={index}>
                    <div className="stranger__info">
                        <i className="far fa-user-circle"></i>
                        <p> {friend.fullname} </p>
                    </div>
                    <div className="stranger__btn">
                        <button onClick={() => onAddFriend(friend)}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            )
        })
    }



    return (
        <section className="user-component">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="avatar">
                            <img src="/avater2.png" alt="#" />
                        </div>
                    </div>
                    <div className="col-xl-5">
                        <div className="description">
                            <h2 className="description_title">
                                <i className='far fa-star'></i> &nbsp;
                                Information &nbsp;
                                <i className='far fa-star'></i>
                            </h2>
                            <div className="add-friend">
                                <span>Your personal information</span>
                            </div>
                            <div className="user_fullname"><p>Username: {user?.username}</p></div>
                            <div className="user_fullname"><p>Full name: {user?.fullname}</p></div>
                            <div className="user_email"><p>Email: {user?.email ?? "Chưa cập nhật ..."}</p></div>
                            <div className="user_ttp"><p>TTP: {user?.TTP}</p></div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="description">
                            <h2 className="description_title">
                                <i className='far fa-star'></i> &nbsp;
                                Friend List &nbsp;
                                <i className='far fa-star'></i>
                            </h2>
                            {isSearching
                                ? (
                                    <div className="add-friend can-click">
                                        <form onSubmit={onSearch}>
                                            <input onChange={e => setSearch(e.target.value)} value={search} />
                                            <span onClick={() => onSearch()}><i className="fas fa-search"></i></span>
                                        </form>
                                    </div>
                                )
                                : (
                                    <div className="add-friend can-click" onClick={() => setIsSearching(true)}>
                                        <i className="fas fa-plus"></i> &nbsp;
                                        <span>Add friend</span>
                                    </div>
                                )
                            }
                            <div className="friend-list">
                                {isSearching
                                    ? renderStranger()
                                    : renderFriends()
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default UserComponent;