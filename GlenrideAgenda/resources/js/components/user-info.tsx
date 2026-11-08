import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
    compact = false,
}: {
    user: User;
    showEmail?: boolean;
    compact?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className={compact ? "h-5 w-5 overflow-hidden rounded-full" : "h-8 w-8 overflow-hidden rounded-full"}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white text-xs">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            {compact ? (
                <span className="truncate text-xs font-medium">{user.name}</span>
            ) : (
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    {showEmail && (
                        <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
