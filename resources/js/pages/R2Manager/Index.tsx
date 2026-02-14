import { router, useForm } from '@inertiajs/react';

export default function Index({ items, currentPath }) {
    const upload = useForm({
        file: null,
        path: currentPath,
    });

    const folder = useForm({
        name: '',
        path: currentPath,
    });

    const go = (path = '') => {
        router.get('/r2', { path });
    };

    const remove = (path) => {
        router.delete('/r2/delete', { data: { path } });
    };

    return (
        <div className="mx-auto max-w-5xl p-6">
            <h1 className="mb-4 text-2xl font-bold">R2 File Manager</h1>

            {/* Path Navigation */}
            <div className="mb-4 space-x-2">
                <button onClick={() => go('')} className="bg-gray-300 px-2">
                    root
                </button>
                {currentPath && (
                    <button className="bg-gray-200 px-2" onClick={() => go(currentPath.split('/').slice(0, -1).join('/'))}>
                        back
                    </button>
                )}
            </div>

            {/* Upload */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    upload.post('/r2/upload');
                }}
                className="mb-4 flex gap-2"
            >
                <input type="file" onChange={(e) => upload.setData('file', e.target.files[0])} />
                <button className="bg-blue-500 px-3 text-white">Upload</button>
            </form>

            {/* Create Folder */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    folder.post('/r2/folder');
                }}
                className="mb-6 flex gap-2"
            >
                <input
                    placeholder="Folder name"
                    value={folder.data.name}
                    onChange={(e) => folder.setData('name', e.target.value)}
                    className="border px-2"
                />
                <button className="bg-green-500 px-3 text-white">Create Folder</button>
            </form>

            {/* File List */}
            <div className="space-y-2">
                {items.map((item) => (
                    <div key={item.path} className="flex items-center justify-between border p-2">
                        <div>
                            {item.type === 'folder' ? (
                                <button className="font-bold" onClick={() => go(item.path)}>
                                    📁 {item.name}
                                </button>
                            ) : (
                                <a href={item.url} target="_blank">
                                    📄 {item.name}
                                </a>
                            )}
                        </div>

                        <button onClick={() => remove(item.path)} className="bg-red-500 px-2 text-white">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
