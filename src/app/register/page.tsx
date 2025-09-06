import NavbarComponent from "@/components/common/Navbar";
// import { useState } from "react";


export default function Register() {

    // const [selectedOption, setSelectedOption] = useState('');

    return (
        <div>
            <NavbarComponent />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Register</h1>
            </div>
        </div>
    )
}