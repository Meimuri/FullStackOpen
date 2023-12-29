const Notification = ({ message, cls }) => {
    if (message === null) {
        return null;
    }

    return <div className={cls}>{message}</div>;
};

export default Notification;
