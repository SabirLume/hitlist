import { useState, useEffect } from "react";
import "./App.css";
import roleService from "./services/role.jsx";
import Role from "./component/Role.jsx";
import Notification from "./component/Notification.jsx";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [location, setLocation] = useState("");
  const [notification, setNotification] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!data.length) {
      roleService
        .getRoles()
        .then((r) => {
          setData(r);

          setNotificationModal("successfully received data from DB", false);
        })
        .catch((e) => {
          console.error("error getting initial data", e.message);
          setNotificationModal("error fetching inital data from DB", true);
        });
    }
    if (filter) {
      onSubmitFilter();
    }
  }, [filter]);

  const onSubmitDeleteRole = (id) => {
    roleService
      .deleteRole(id)
      .then(() => setNotificationModal("Successfully deleted role", false))
      .catch((e) => {
        console.error("error", e.message);
        setNotificationModal("error deleting role from DB", true);
        return;
      });

    setData((n) => n.filter((item) => item.id != id));
  };

  const onSubmitAddRole = () => {
    if (!name & !role & !link & !location) {
      return;
    }

    let roleData = {
      name: name,
      role: role,
      link: link,
      location: location,
    };

    roleService
      .addRole(roleData)
      .then((data) => {
        roleData = { ...data };
        console.log("data", roleData);
      })
      .catch((e) => {
        console.error("error", e.message);

        setNotificationModal("error adding role to DB", true);
        return;
      });

    setData((n) => n.concat(roleData));
  };

  const onSubmitFilter = () => {
    setFilteredData(
      data.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase())),
    );
  };

  const setNotificationModal = (message, isError) => {
    const newMessage = { message, isError };

    setNotification(newMessage);
    setTimeout(() => {
      setNotification({ message: "" });
    }, 5000);
  };

  return (
    <>
      <h1>Hitlist</h1>
      <Notification message={notification} />
      <div className={"flex-form-container"}>
        <ul>
          <li>
            <input
              placeholder={"Filter by Role Name"}
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            ></input>
          </li>
          <li>
            <input
              placeholder={"Company Name"}
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </li>
          <li>
            <input
              placeholder={"Role Location"}
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            ></input>
          </li>
          <li>
            <input
              placeholder={"Role Name"}
              onChange={(e) => setRole(e.target.value)}
              value={role}
            ></input>
          </li>
          <li>
            <input
              placeholder={"Link to Role"}
              onChange={(e) => setLink(e.target.value)}
              value={link}
            ></input>
          </li>
          <li>
            <button className={"submit-button"} onClick={onSubmitAddRole}>
              submit role
            </button>
          </li>
        </ul>
      </div>
      <div className={"role-list"}>
        {filter.length > 0 ? (
          <Role data={filteredData} onSubmit={onSubmitDeleteRole} />
        ) : (
          <Role data={data} onSubmit={onSubmitDeleteRole} />
        )}
      </div>
    </>
  );
}

export default App;
