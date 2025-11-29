export const fileStatusData: { label: string; value: string; description: string }[] = [
    {
        label: 'Downloadable',
        value: 'downloadable',
        description: 'Users can view and download the file.',
    },
    {
        label: 'Read Only',
        value: 'read_only',
        description: 'Users can view the file but cannot download it.',
    },
    {
        label: 'Private',
        value: 'private',
        description: 'The file is only accessible by admins or the owner; not visible to general users.',
    },
];
