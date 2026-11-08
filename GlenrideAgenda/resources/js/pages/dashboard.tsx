import { Agenda } from '@/components/agenda';
import AppLayout from '@/layouts/app-layout';
import { type Category, type Note } from '@/types';
import { Head } from '@inertiajs/react';

interface DashboardProps {
    categories: Category[];
    notes: Note[];
}

export default function Dashboard({ categories = [], notes = [] }: DashboardProps) {
    return (
        <AppLayout>
            <Head title="Agenda" />
            <Agenda initialCategories={categories} initialNotes={notes} />
        </AppLayout>
    );
}
