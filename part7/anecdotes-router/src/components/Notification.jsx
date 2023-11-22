const Notification = (notification) => {
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    };

    // console.log(notification.message !== "");

    return (
        notification.message && <div style={style}>{notification.message}</div>
    );

    // console.log();
};

export default Notification;
