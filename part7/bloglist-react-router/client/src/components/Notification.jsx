import { useSelector } from "react-redux";

const Notification = () => {
    const { notification, type } = useSelector((state) => state.notification);
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
    };
    return (
        notification && (
            <div style={style} className={type}>
                {notification}
            </div>
        )
    );
};

export default Notification;
