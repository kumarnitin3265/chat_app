
import { useEffect, useState } from "react";
import NavStyle from "./Navbar.module.css";
import { Link, Outlet, useParams } from "react-router-dom";
import { Data } from "../Pages/Data";

function Navbar() {

    const [searchItem, setSearchItem] = useState("");
    const [filterContacts, setFilterContacts] = useState(Data);
    const [toggle, setToggle] = useState(false);
    const [userId, setUserId] = useState(-1);

    const indexOfPerson = useParams();
    const item = Data[Number(indexOfPerson?.id)];

    useEffect(() => {
        if (indexOfPerson?.id) {
            setUserId(indexOfPerson?.id);
        }

    }, [indexOfPerson]);

    useEffect(() => {
        let filtered = Data;

        if (searchItem) {
            filtered = filtered.filter(item =>
                item.person_name.toLowerCase().includes(searchItem.toLowerCase())
            );
        }

        setFilterContacts(filtered);
    }, [searchItem]);

    
    const handleSearch = (query) => {
        setSearchItem(query);

        let filtered = Data;

        filtered = filtered.filter(item =>
            item.person_name.toLowerCase().includes(query.toLowerCase())
        )

        setFilterContacts(filtered);
    }

    return (
        <>
            <div className={NavStyle.home}>
                <div className={NavStyle.contacts}>
                    <div className={NavStyle.search}>
                        <div className={NavStyle.imgSearch}>
                            <img src="https://cdn-icons-png.flaticon.com/128/6318/6318076.png" alt="search" />
                        </div>
                        <div className={NavStyle.searchInput}>
                            <input type="text" placeholder="Search for conversation" value={searchItem} onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className={NavStyle.conversations}>
                        <div className={NavStyle.icons} >
                            <h4>CONVERSATIONS</h4>
                            {!toggle ? <Link to="/contacts" onClick={() => setToggle(!toggle)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/992/992651.png" alt="plus" />
                            </Link> : userId === -1 ? <Link to={`/`} onClick={() => setToggle(!toggle)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/992/992651.png" alt="plus" />
                            </Link> : <Link to={`/home/${userId}`} onClick={() => setToggle(!toggle)}>
                                <img src="https://cdn-icons-png.flaticon.com/128/992/992651.png" alt="plus" />
                            </Link>}
                        </div>
                    </div>
                    <div className={NavStyle.people}>
                        {filterContacts?.map((item, index) => (
                            <Link to={`/home/${item.id}`} key={index} className={NavStyle.navLink}>
                                <div className={NavStyle.person}>
                                    <div className={NavStyle.circle}>
                                        <img src={item?.img_link} alt={item?.person_name} />
                                    </div>
                                    <div className={NavStyle.nameMsg}>
                                        <h3>{item?.person_name}</h3><br />
                                        <p>{Array.isArray(item?.last_msg) ? item?.last_msg[0] : item?.last_msg}</p>
                                        {/* <p>{item?.last_msg}</p> */}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Navbar;