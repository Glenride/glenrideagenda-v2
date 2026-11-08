import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Agenda Types
export interface Category {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    projects?: Project[];
}

export interface Project {
    id: number;
    user_id: number;
    category_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    category?: Category;
    notes?: Note[];
}

export interface Note {
    id: number;
    user_id: number;
    project_id: number;
    title: string;
    content: string | null;
    is_on_agenda: boolean;
    linked_date: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    project?: Project;
}

export type FilterType = 'all' | 'on_agenda' | 'today' | 'project';
