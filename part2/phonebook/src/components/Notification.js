const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const createStyle = (color) => {
    return {
      color: `${color}`,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  };

  return (
    <div>
      {notification.isSuccessful ? <p style={createStyle('green')}>{notification.message}</p> : <p style={createStyle('red')}>{notification.message}</p>}
    </div>
  );
};

export default Notification;