
import { useEffect, useRef, useState } from "react";
import HomeStyle from "../Styles/Home.module.css";
import { Data } from "./Data";
import { useParams } from "react-router-dom";
import Notification from "./Notification";

function Home() {

    const [textInput, setTextInput] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [fileInput, setFileInput] = useState('');
    const userMsgRef = useRef(null);
    const fileInputRef = useRef(null);

    // Get the person's id from the URL params
    const indexOfPerson = useParams();
    // console.log(indexOfPerson);

    // Get the person's data based on the id
    const item = Data[Number(indexOfPerson?.id)];
    // console.log(item);

    // const params = useParams();
    // console.log(params);

    // const item = Data.find((item) => item.id === params.id);
    // console.log(item);



    useEffect(() => {
        return () => {
            // Clean up object URLs when the component is unmounted
            item?.messages?.forEach((msg) => {
                if (msg.img) {
                    URL.revokeObjectURL(msg.img);
                }
            });
        }
    }, []);

    const handleSmiley = () => {

        if (textInput) {
            setTextInput(textInput + "😀");
        } else {
            setTextInput("😀");
        }

    }

    const handleHeart = () => {

        if (textInput) {
            setTextInput(textInput + "❤️");
        } else {
            setTextInput("❤️");
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('inside submit');
        if (fileInput?.length > 0) {
            Data[Number(indexOfPerson?.id)].messages?.push({ direction: 'right', img: fileInput });
            setFileInput('');
        }
        else {
            Data[Number(indexOfPerson?.id)].messages?.push({ direction: 'right', text: textInput });
            Data[Number(indexOfPerson?.id)].last_msg = [textInput];
        }
        setTextInput('');
        Notification("Message Send Successfully!", false);
    }

    const handleImageUpload = (e) => {
        // console.log('data', e.target.files)
        setFileInput(URL.createObjectURL(e.target.files[0]));
        setTextInput(URL.createObjectURL(e.target.files[0]));
        Notification("Image Added Successfully!", false);
        
    }


    return (
        <>
            <div className={HomeStyle.home}>
                <div className={HomeStyle.chats}>
                    <div className={HomeStyle.chatBar}>
                        <div className={HomeStyle.inbox}>
                            <img src={item.img_link} alt={item.person_name} />
                        </div>
                        <div className={HomeStyle.status}>
                            <h3>{item.person_name}</h3>
                        </div>
                    </div>
                    <div className={HomeStyle.chatting}>
                        {item?.messages?.map((msg, i) => (
                            <div key={i}>
                                {msg.direction === 'left' && msg.text &&
                                    <>
                                        <div className={HomeStyle.contactMsg}>
                                            <p>{msg?.text}</p>
                                        </div>
                                        <div className={HomeStyle.contactImg}>
                                            <img src={item.img_link} alt={item.person_name} />
                                            <p>{item.person_name}</p>
                                        </div>
                                    </>
                                }
                                {msg?.direction === 'right' &&
                                    <>
                                        <div
                                            className={HomeStyle.userMsg}>
                                            {msg?.text ? <p>{msg?.text}</p> : msg?.img &&
                                                <img src={msg?.img} alt="fileInput" style={{ height: 400, width: 400 }} />}
                                        </div>
                                        <div className={HomeStyle.userImg}>
                                            <p>You</p>
                                            <img src="https://cdn-icons-png.flaticon.com/128/12965/12965372.png" alt="userInbox" />
                                        </div>
                                    </>
                                }
                            </div>
                        ))}
                    </div>
                    <div className={HomeStyle.typeBar}>
                        <div className={HomeStyle.wrapper}>
                            <div className={HomeStyle.btnimg}><img src="https://cdn-icons-png.flaticon.com/128/8455/8455362.png" alt="attachments" /></div>
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                        <div className={HomeStyle.typing}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Type your message here..."
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    required
                                />
                                <div className={HomeStyle.emojis}>
                                    <img src="https://t4.ftcdn.net/jpg/04/55/02/39/240_F_455023905_bThhxzhrMSvzN0YiC2jScagjVEDAiHv2.jpg" alt="smiles" onClick={handleSmiley} />
                                    <img src="https://cdn-icons-png.flaticon.com/128/13481/13481175.png" alt="heart" onClick={handleHeart} />
                                </div>
                                <button type="submit" onClick={handleSubmit}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;