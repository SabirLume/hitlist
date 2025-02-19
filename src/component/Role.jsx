const Role = ({ data, onSubmit }) => {
  return (
    <ul>
      <h1>Roles </h1>
      {data.map((item) => (
        <li key={item.id}>
          {item.name} | {item.location} | {item.role} | {item.link}
          <button className={"delete-button"} onClick={() => onSubmit(item.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Role;
