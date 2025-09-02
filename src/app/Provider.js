import { Toaster } from "react-hot-toast";

export default function Provider({ children }) {
    return <><Toaster />{children}</>
}