
import NotFoundClient from "@/components/NotFoundClient";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Oops! Page Not Found",
    description:
        "Looks like you've taken a wrong turn! The page you're searching for seems to have vanished into the digital void. No worries though - let's navigate you back to our main content hub.",
};



export default function NotFound() {
    return (
        <NotFoundClient />
    )
}