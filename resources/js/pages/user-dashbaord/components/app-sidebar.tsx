import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import useTranslation from '@/hooks/use-translation';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookmarkCheckIcon, FilePenLineIcon, Layers2Icon, LayoutDashboardIcon, ListTodoIcon, ShapesIcon, TagsIcon, Tally5Icon } from 'lucide-react';

export function AppSidebar() {
    const { t, currentLocale } = useTranslation();
    const mainNavItems: NavItem[] = [
        {
            title: t('Dashboard'),
            permission: '',
            url: '/dashboard',
            icon: LayoutDashboardIcon,
        },
        {
            title: t('Items'),
            permission: 'item view',
            url: '/admin/items',
            icon: ListTodoIcon,
            subItems: [
                {
                    title: t('Items'),
                    permission: 'item view',
                    icon: ListTodoIcon,
                    url: '/admin/items',
                },
                {
                    title: t('Categories'),
                    permission: 'item view',
                    icon: Layers2Icon,
                    url: '/admin/item_categories',
                },
                {
                    title: t('Brands'),
                    permission: 'item view',
                    icon: TagsIcon,
                    url: '/admin/item_brands',
                },
                {
                    title: t('Models'),
                    permission: 'item view',
                    icon: BookmarkCheckIcon,
                    url: '/admin/item_models',
                },
                {
                    title: t('Body Types'),
                    permission: 'item view',
                    icon: ShapesIcon,
                    url: '/admin/item_body_types',
                },
                {
                    title: t('View Counts'),
                    permission: 'item view',
                    icon: Tally5Icon,
                    url: '/admin/item_view_counts',
                },
            ],
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            permission: 'sample_content view',
            title: t('Sample Content'),
            url: '/admin/ckeditor5',
            icon: FilePenLineIcon,
        },
        // {
        //     title: 'File Manager',
        //     url: '/admin/my_file_manager',
        //     icon: Folder,
        // },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset" className={`${currentLocale == 'kh' ? 'font-siemreap-regular' : 'font-poppins-regular'}`}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
