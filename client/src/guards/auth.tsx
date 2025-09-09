import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useGetProfile } from "@/api/login";
import { router } from "@/router";
import Loader from "@/components/Loader";

type AuthGuardProps = {
    children: React.ReactNode;
    loader?: React.ReactNode;
};

export function AuthGuard({ children, loader }: AuthGuardProps) {


    return <>{children}</>;
}
