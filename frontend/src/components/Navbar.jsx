import githubLogo from "../assets/github.png";
function Navbar({ className }) {
    return (
        <div className={`${className} flex items-center justify-between`}>
            <div>
                <h1 className="mx-14 my-4 font-semibold font-sans text-xl">Remote Code</h1>
            </div>
            <a href="https://github.com/mranish592/remote-code/blob/main/README.md">
                <img src={githubLogo} alt="github" className="h-8 w-8 mx-14" />
            </a>
        </div>
    );
}

export default Navbar;
