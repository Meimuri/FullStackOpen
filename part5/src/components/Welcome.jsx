import Button from "./Button";

const Welcome = ({ user, handleLogout }) => {
    return (
        <p>
            {`${user.name} logged in `}
            <Button label="Logout" onClick={handleLogout} />
        </p>
    );
};

export default Welcome;
