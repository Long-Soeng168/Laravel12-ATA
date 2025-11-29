import { TableCell } from '@/components/ui/table';

interface TableCellActionsProps {
    children: React.ReactNode;
}

const TableCellActions = ({ children }: TableCellActionsProps) => {
    return <TableCell className="space-x-2 whitespace-nowrap">{children}</TableCell>;
};

export default TableCellActions;
