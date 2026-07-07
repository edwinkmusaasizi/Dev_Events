'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const paths = pathname.split('/').filter((path) => path !== '');

    if (paths.length === 0) return null;

    return (
        <nav className="flex items-center gap-2 text-sm text-light-200 mb-8 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar font-martian-mono">
            <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
            </Link>

            {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join('/')}`;
                const isLast = index === paths.length - 1;
                
                // Format name: capitalize and remove hyphens
                let name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
                
                // Special case for hex-like IDs or very long slugs if needed
                if (name.length > 25) name = name.substring(0, 22) + '...';

                return (
                    <div key={path} className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                        {isLast ? (
                            <span className="text-primary font-semibold">{name}</span>
                        ) : (
                            <Link href={href} className="hover:text-primary transition-colors">
                                {name}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
