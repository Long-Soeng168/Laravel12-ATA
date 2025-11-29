export const postStatusData: any[] = [
    { label: 'Published', value: 'published', color: 'green-600', description: 'Visible to everyone.' },
    { label: 'Unpublished', value: 'unpublished', color: 'gray-600', description: 'Hidden from public.' },
];

export const itemMetadataStatusData: any[] = [
    { label: 'Unverified', value: 'unverified', color: 'gray-600', description: 'Hidden from public.' },
    { label: 'Verified', value: 'verified', color: 'green-600', description: 'Visible to everyone.' },
];

export const shopStatusData: any[] = [
    { label: 'Pending', value: 'pending', color: 'blue-500', description: 'Your shop is under review.' },
    { label: 'Approved', value: 'approved', color: 'green-600', description: 'Your shop is approved and visible to the public.' },
    { label: 'Rejected', value: 'rejected', color: 'red-600', description: 'Your shop has been rejected. Please review and resubmit.' },
    { label: 'Suspended', value: 'suspended', color: 'gray-600', description: 'Your shop has been rejected. Please review and resubmit.' },
];

export const orderStatusData: any[] = [
    { label: 'Pending', value: 'pending', color: 'blue-500', description: 'Order is under review.' },
    { label: 'Completed', value: 'completed', color: 'green-600', description: 'Order is completed.' },
    { label: 'Rejected', value: 'rejected', color: 'red-600', description: 'Order has been rejected.' },
];
