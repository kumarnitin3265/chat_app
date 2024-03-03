
import { Link } from "react-router-dom";
import ContactStyle from "../Styles/Contacts.module.css";
import { Data } from "./Data";

function Contacts() {

    return (
        <>
            <div className={ContactStyle.contacts}>
                <div className={ContactStyle.all}>
                    <h2>New Chat</h2>
                    <div className={ContactStyle.user}>
                        <img src="https://cdn-icons-png.flaticon.com/128/12965/12965372.png" alt="you" />
                        <h4>You</h4>
                    </div>
                    <h3>All Contacts</h3>
                    {Data?.map((item, index) => (
                        <Link to={`/home/${item.id}`} key={index} className={ContactStyle.navLink}>
                            <div className={ContactStyle.item}>
                                <img src={item.img_link} alt="contact" />
                                <h4>{item.person_name}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Contacts;