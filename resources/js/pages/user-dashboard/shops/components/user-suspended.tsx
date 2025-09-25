import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useTranslation from '@/hooks/use-translation';
import { Ban, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';
import ContactUsButton from '../../components/contact-us-button';

interface UserSuspendedProps {
    type?: 'pending' | 'suspended' | 'rejected'; // new prop
    title?: string;
    subTitle?: string;
}

const UserSuspended: React.FC<UserSuspendedProps> = ({ type = 'pending', title, subTitle }) => {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation();

    // Map for default title, subtitle, colors, and icon per type
    const statusMap = {
        pending: {
            title: t('Garage Pending!'),
            subTitle: t('Your garage is currently under review. Please wait until it gets approved.'),
            icon: <Clock className="size-14 text-yellow-400" />,
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-600',
        },
        rejected: {
            title: t('Garage Suspended!'),
            subTitle: t('Your garage has been temporarily suspended. Please contact support.'),
            icon: <Ban className="size-14 text-red-400" />,
            bgColor: 'bg-red-100',
            textColor: 'text-red-600',
        },
        suspended: {
            title: t('Garage Rejected!'),
            subTitle: t('Your garage application has been rejected. Please contact support.'),
            icon: <XCircle className="size-14 text-gray-600" />,
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-600',
        },
    };

    const current = statusMap[type];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm space-y-4 rounded-2xl p-6 text-center">
                <div className={`mx-auto flex items-center justify-center rounded-full p-4 ${current.bgColor}`}>{current.icon}</div>

                <DialogHeader>
                    <DialogTitle className={`text-center text-2xl font-bold ${current.textColor}`}>{title || current.title}</DialogTitle>
                    <DialogDescription className="flex justify-center text-gray-600">
                        <p className="w-auto max-w-[60ch] text-center text-base">{subTitle || current.subTitle}</p>
                    </DialogDescription>
                </DialogHeader>

                <span>
                    <ContactUsButton />
                </span>
            </DialogContent>
        </Dialog>
    );
};

export default UserSuspended;
