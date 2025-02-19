const Notification = ({ message }) => {
  if (message.message == "") {
    return null;
  }

  return (
    <>
      {message.isError ? (
        <span className={"error-modal"}>{message.message}</span>
      ) : (
        <span className={"success-modal"}>{message.message}</span>
      )}
    </>
  );
};
export default Notification;
