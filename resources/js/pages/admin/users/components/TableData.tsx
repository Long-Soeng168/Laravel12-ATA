import DeleteItemButton from '@/components/Button/DeleteItemButton';
import EditItemButton from '@/components/Button/EditItemButton';
import ViewItemButton from '@/components/Button/ViewItemButton';
import NoDataDisplay from '@/components/NoDataDisplay';
import TableCellActions from '@/components/Table/TableCellActions';
import TableCellBadge from '@/components/Table/TableCellBadge';
import TableCellDate from '@/components/Table/TableCellDate';
import TableCellText from '@/components/Table/TableCellText';
import TableHeadWithSort from '@/components/Table/TableHeadWithSort';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';

const TableData = () => {
    const hasPermission = usePermission();
    const { t } = useTranslation();
    const { tableData } = usePage<any>().props;

    return (
        <>
            <div className="table-data-container">
                <ScrollArea className="w-full">
                    <Table>
                        <TableHeader className="table-header bg-accent/30">
                            <TableRow>
                                <TableHeadWithSort field="id" label={t('ID')} />
                                <TableHeadWithSort label={t('Action')} />
                                <TableHeadWithSort label={t('Image')} />
                                <TableHeadWithSort field="name" label={t('Name')} />
                                <TableHeadWithSort field="email" label={t('Email')} />
                                <TableHeadWithSort label={t('Role')} />
                                <TableHeadWithSort field="phone" label={t('Phone Number')} />
                                <TableHeadWithSort field="gender" label={t('Gender')} />
                                <TableHeadWithSort field="shop_id" label={t('Shop')} />
                                <TableHeadWithSort field="garage_id" label={t('Garage')} />
                                <TableHeadWithSort field="is_verified" label={t('Verified')} />
                                <TableHeadWithSort field="created_at" label={t('Created at')} />
                                <TableHeadWithSort field="updated_at" label={t('Updated at')} />
                            </TableRow>
                        </TableHeader>
                        <TableBody className="table-body">
                            {tableData?.data?.map((item: any) => (
                                <TableRow key={item.id} className="group table-row">
                                    <TableCellText value={item.id} />

                                    <TableCellActions>
                                        <div className="flex items-center gap-2">
                                            <EditItemButton url={`/admin/users/${item.id}/edit`} permission="user update" />
                                            <ViewItemButton url={`/admin/users/${item.id}`} permission="user view" />
                                            <DeleteItemButton deletePath="/admin/users/" id={item.id} permission="user delete" />
                                        </div>
                                    </TableCellActions>

                                    {/* User Avatar */}
                                    <TableCell>
                                        <button className="bg-muted/50 size-10 overflow-hidden rounded-full border transition-transform hover:scale-110">
                                            <img
                                                src={item.image ? `/assets/images/users/thumb/${item.image}` : `/assets/icons/image-icon.png`}
                                                className="h-full w-full object-cover"
                                                alt=""
                                            />
                                        </button>
                                    </TableCell>

                                    <TableCellText value={item.name} />
                                    <TableCellText value={item.email} className="text-muted-foreground text-sm" />

                                    {/* Roles as Pill Badges */}
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            {item.roles?.map((role: any) => (
                                                <Badge key={role.id} variant="outline">
                                                    {role.name}
                                                </Badge>
                                            )) || '---'}
                                        </div>
                                    </TableCell>

                                    <TableCellText value={item.phone} />

                                    <TableCell>
                                        <TableCellBadge variant="outline" className="capitalize" value={t(item.gender)} />
                                    </TableCell>

                                    <TableCell>
                                        {item.shop ? (
                                            <Link href={`/admin/shops/${item.shop_id}`} className="hover:underline">
                                                <TableCellBadge variant="outline" className="border-blue-200 text-blue-600" value={item.shop.name} />
                                            </Link>
                                        ) : (
                                            <TableCellText value="---" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {item.garage ? (
                                            <Link href={`/admin/garages/${item.garage_id}`} className="hover:underline">
                                                <TableCellBadge
                                                    variant="outline"
                                                    className="border-blue-200 text-blue-600"
                                                    value={item.garage.name}
                                                />
                                            </Link>
                                        ) : (
                                            <TableCellText value="---" />
                                        )}
                                    </TableCell>

                                    {/* Verified Status */}
                                    <TableCell>
                                        {item.is_verified ? (
                                            <TableCellBadge variant="default" className="bg-blue-500" value={t('Verified')} />
                                        ) : (
                                            <TableCellText value="---" />
                                        )}
                                    </TableCell>

                                    <TableCellDate value={item.created_at} />
                                    <TableCellDate value={item.updated_at} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {tableData?.data?.length < 1 && <NoDataDisplay />}
        </>
    );
};

export default TableData;
