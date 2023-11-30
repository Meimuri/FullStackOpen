import { useSelector } from "react-redux";

const Notification = () => {
    const { notification, type } = useSelector((state) => state.notification);
    const style = type === "error" ? "bg-red-400" : "bg-blue-400";

    return (
        notification && (
            <div
                className={`relative block w-full p-4 mb-4 text-base leading-5 text-white ${style} opacity-100 font-regular`}
            >
                {notification}
            </div>
        )
    );
};

export default Notification;
