const Header = ({ text }) => {
    return (
        <header className="bg-white shadow">
            <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {text}
                </h1>
            </div>
        </header>
    );
};

export default Header;
