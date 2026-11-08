import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            {children}
        </div>
    );
}
