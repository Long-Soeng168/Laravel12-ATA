import BottomNavbarHideAndShow from '@/components/Navigation/BottomNavbarHideAndShow';
import { Toaster } from '@/components/ui/sonner';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import ProfileLayoutHeader from './components/ProfileLayoutHeader';

interface ProfileLayoutProps {
    children: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
    const { url } = usePage();

    // Check if the URL starts with either path
    // const hideBottomNav = url.startsWith('/student-register') || url.startsWith('/login');

    return (
        <div className="bg-background flex min-h-screen flex-col font-sans text-gray-900 dark:bg-white/5 dark:text-gray-100">
            {/* --- Header Section --- */}
            <ProfileLayoutHeader />

            {/* --- Main Page Content --- */}
            <main className="flex-grow pb-20">{children}</main>

            <BottomNavbarHideAndShow />
            <Toaster />
        </div>
    );
};

export default ProfileLayout;
