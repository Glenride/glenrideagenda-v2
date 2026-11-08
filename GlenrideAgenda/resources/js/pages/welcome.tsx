import { Head, Link, usePage } from '@inertiajs/react';
import { Check, Clock, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';
import { SharedData } from '@/types';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            
            <div className="min-h-screen bg-[#f3f4f6] p-4 md:p-8 font-sans flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[1400px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-sm overflow-hidden min-h-[800px] flex flex-col">
                    {/* Dot Pattern Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none" 
                        style={{
                            backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                            opacity: 0.8
                        }}>
                    </div>

                    {/* Navbar */}
                    <header className="relative z-50 px-6 py-6 md:px-10 md:py-8 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="grid grid-cols-2 gap-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-neutral-900">GlenrideAgenda</span>
                        </div>

                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
                            <a href="#" className="hover:text-neutral-900 transition-colors">Features</a>
                            <a href="#" className="hover:text-neutral-900 transition-colors">Solutions</a>
                            <a href="#" className="hover:text-neutral-900 transition-colors">Resources</a>
                            <a href="#" className="hover:text-neutral-900 transition-colors">Pricing</a>
                        </nav>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button variant="ghost" className="font-medium text-sm">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button variant="ghost" className="font-medium text-neutral-600 hover:text-neutral-900 text-sm">Sign in</Button>
                                    </Link>
                                    <Button className="rounded-full px-6 h-10 bg-white text-neutral-900 border border-neutral-200 shadow-sm hover:bg-neutral-50 text-sm font-medium">
                                        Get demo
                                    </Button>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Hero Section */}
                    <main className="relative z-10 flex-1 flex flex-col items-center justify-center pb-20 px-4 text-center">
                        
                        {/* Central 3D Icon */}
                        <div className="mb-10 relative group">
                            <div className="absolute inset-0 bg-neutral-200 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative h-20 w-20 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center border border-white/50 backdrop-blur-sm">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
                                    <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
                                    <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
                                </div>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-neutral-900 mb-6 leading-[1.1]">
                            Think, plan, and track <br/>
                            <span className="text-neutral-400">all in one place</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg text-neutral-500 mb-12 max-w-md font-normal">
                            Efficiently manage your tasks and boost productivity.
                        </p>

                        {/* CTA Button */}
                        <Button size="lg" className="rounded-xl px-8 bg-[#2563EB] hover:bg-blue-700 text-white shadow-blue-200 shadow-lg border-0 h-12 text-base font-medium">
                            Get free demo
                        </Button>

                        {/* Floating Elements Container - Absolute positioned relative to main content area */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            
                            {/* Sticky Note (Top Left) - With realistic shadow and pin */}
                            <div className="absolute top-[8%] left-[2%] xl:left-[5%] transform -rotate-6 animate-in fade-in duration-1000 slide-in-from-bottom-10">
                                <div className="relative">
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm border border-red-600/30"></div>
                                        <div className="w-0.5 h-2 bg-black/20 mx-auto blur-[0.5px]"></div>
                                    </div>
                                    <div className="bg-[#fef08a] p-6 w-52 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transform rotate-2 text-neutral-800 font-handwriting rounded-sm">
                                        <p className="font-medium text-sm md:text-base leading-relaxed handwriting">
                                            Take notes to keep track of crucial details, and accomplish more tasks with ease.
                                        </p>
                                    </div>
                                    {/* White sheet underneath */}
                                    <div className="absolute top-4 -right-8 -z-10 transform rotate-12 bg-white w-40 h-48 rounded-xl shadow-lg border border-neutral-100"></div>
                                </div>
                            </div>

                            {/* Check Icon (Left) - Glossy 3D look */}
                            <div className="absolute top-[45%] left-[3%] xl:left-[8%] transform -rotate-12 animate-in fade-in duration-1000 delay-200 slide-in-from-bottom-10">
                                <div className="bg-white p-5 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 backdrop-blur-sm">
                                    <div className="bg-[#3B82F6] rounded-xl p-2 shadow-inner">
                                        <Check className="h-8 w-8 text-white stroke-[3]" />
                                    </div>
                                </div>
                            </div>

                            {/* Reminders Card (Top Right) - Folder/Tab style */}
                            <div className="absolute top-[5%] right-[2%] xl:right-[5%] animate-in fade-in duration-1000 delay-300 slide-in-from-bottom-10">
                                <div className="relative group">
                                    {/* Floating clock icon */}
                                    <div className="absolute -left-6 top-8 z-20 bg-white p-3 rounded-2xl shadow-lg border border-neutral-100 transform -rotate-12">
                                        <Clock className="h-6 w-6 text-neutral-800" />
                                        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    
                                    <div className="w-72 bg-neutral-50/80 backdrop-blur-sm shadow-xl border border-white/60 p-1 rounded-[2rem] transform rotate-3">
                                        <div className="bg-white rounded-[1.7rem] p-5 border border-neutral-100/50">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="font-semibold text-neutral-900 ml-1">Reminders</h3>
                                                <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Meetings</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                                    <div className="text-xs text-neutral-500 mb-1.5 font-medium">Today's Meeting</div>
                                                    <div className="text-sm font-medium text-neutral-900">Call with marketing team</div>
                                                    <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-500 bg-blue-50 w-fit px-3 py-1 rounded-full font-medium">
                                                        <Clock className="h-3 w-3" />
                                                        13:00 - 13:45
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Today's Tasks (Bottom Left) - Folder style */}
                            <div className="absolute bottom-[8%] left-[2%] xl:left-[5%] animate-in fade-in duration-1000 delay-500 slide-in-from-bottom-10">
                                <div className="w-72 bg-neutral-100 shadow-xl border border-white p-1 rounded-[2rem] transform -rotate-2">
                                    <div className="bg-white rounded-[1.7rem] p-5">
                                        <h3 className="font-semibold text-neutral-900 mb-5 ml-1">Today's tasks</h3>
                                        <div className="space-y-4">
                                            <div className="bg-white rounded-xl border border-neutral-100 p-3 shadow-sm">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-orange-100 p-1 rounded text-orange-600 text-[10px] font-bold">B</div>
                                                        <span className="text-xs font-medium">New Ideas for campaign</span>
                                                    </div>
                                                    <span className="text-[10px] text-neutral-400">60%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-[60%] bg-blue-500 rounded-full"></div>
                                                </div>
                                                <div className="mt-1 text-[10px] text-neutral-400">Sep 10</div>
                                            </div>
                                            
                                            <div className="bg-white rounded-xl border border-neutral-100 p-3 shadow-sm opacity-80">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-green-100 p-1 rounded text-green-600 text-[10px] font-bold">3</div>
                                                        <span className="text-xs font-medium">Design PPT #4</span>
                                                    </div>
                                                    <span className="text-[10px] text-neutral-400">112%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-full bg-red-500 rounded-full"></div>
                                                </div>
                                                <div className="mt-1 text-[10px] text-neutral-400">Sep 18</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integrations (Bottom Right) - Folder style with icons */}
                            <div className="absolute bottom-[10%] right-[2%] xl:right-[5%] animate-in fade-in duration-1000 delay-700 slide-in-from-bottom-10">
                                <div className="w-64 bg-neutral-100 shadow-xl border border-white p-1 rounded-[2.5rem] transform rotate-6">
                                    <div className="bg-white rounded-[2.2rem] p-6">
                                        <h3 className="font-semibold text-neutral-900 mb-6 text-sm ml-1">100+ Integrations</h3>
                                        <div className="flex gap-3 justify-center relative">
                                            {/* Gmail Icon */}
                                            <div className="h-14 w-14 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-2xl flex items-center justify-center border border-neutral-50 transform -rotate-6 z-10">
                                                <svg viewBox="0 0 24 24" className="w-8 h-8">
                                                    <path fill="#EA4335" d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,6L12,11L4,6H20z"/>
                                                </svg>
                                            </div>
                                            {/* Slack Icon */}
                                            <div className="h-14 w-14 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-2xl flex items-center justify-center border border-neutral-50 z-20 -mt-2">
                                                 <svg viewBox="0 0 24 24" className="w-8 h-8">
                                                    <path fill="#E01E5A" d="M6,15a2,2,0,0,1-2,2A2,2,0,0,1,2,15a2,2,0,0,1,2-2h2v2Zm1-2a2,2,0,0,1,2-2h2a2,2,0,0,1-2,2H7Z"/>
                                                    <path fill="#36C5F0" d="M6,7a2,2,0,0,1,2-2A2,2,0,0,1,10,7a2,2,0,0,1-2,2H6V7Zm1,2a2,2,0,0,1,2,2V13a2,2,0,0,1-2-2V9Z"/>
                                                    <path fill="#2EB67D" d="M17,15a2,2,0,0,1,2-2,2,2,0,0,1,2,2,2,2,0,0,1-2,2H17V15Zm-1,2a2,2,0,0,1-2,2H12a2,2,0,0,1,2-2H16Z"/>
                                                    <path fill="#ECB22E" d="M17,7a2,2,0,0,1-2,2,2,2,0,0,1-2-2,2,2,0,0,1,2-2H17V7Zm-1-2a2,2,0,0,1-2-2v2a2,2,0,0,1,2,2V5Z"/>
                                                 </svg>
                                            </div>
                                            {/* Calendar Icon */}
                                            <div className="h-14 w-14 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-2xl flex items-center justify-center border border-neutral-50 transform rotate-6 z-10">
                                                <div className="relative w-8 h-8 bg-[#4285F4] rounded-lg flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">31</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            
            {/* Simple CSS for handwriting font simulation if not available */}
            <style>{`
                .handwriting {
                    font-family: "Comic Sans MS", "Chalkboard SE", sans-serif;
                }
            `}</style>
        </>
    );
}
