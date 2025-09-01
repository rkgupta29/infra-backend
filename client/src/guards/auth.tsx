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
    const navigate = useNavigate();
    const { data: profile, isLoading, isError } = useGetProfile();

    useEffect(() => {
        const currentPath = router.state.location.pathname;
        const isLoginPage = currentPath === "/login";

        if (!isLoading && !isLoginPage && (isError || !profile)) {
            navigate({ to: "/login" });
        }
        if (!isLoading && isLoginPage && profile?.email) {
            navigate({ to: "/" });
        }
    }, [isLoading, isError, profile, router.state.location.pathname, navigate]);

    if (isLoading) {
        return (
            loader ?? (
                <div className="h-screen w-full grid place-items-center">
                    <Loader />
                </div>
            )
        );
    }

    return <>{children}</>;
}
