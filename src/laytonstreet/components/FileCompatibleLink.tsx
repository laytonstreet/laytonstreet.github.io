import * as React from 'react';

export default function FileCompatibleLink({ href, children }: {href: string, children: any}) { // TODO move to own file
    const filename = href.startsWith('file:') ? href.substring('file:'.length) : null;
    const hrefUri = filename ? 'javascript:void(0)' : href;
    const [fileUri, setFileUri] = React.useState<string>();
    React.useEffect(() => {
        if (fileUri) {
            return () => URL.revokeObjectURL(fileUri);
        } else {
            return undefined; // no cleanup required
        }
    }, [fileUri]);
    const openFile = async () => {
        if (fileUri) {
            window.open(fileUri, '_blank');
        } else {
            let response = await fetch(`/files/${filename}`);
            let blob = await response.blob();
            let uri = URL.createObjectURL(blob);
            window.open(uri, '_blank');
            setFileUri(uri);
        }
    };
    return (
        <a href={hrefUri} onClick={filename ? openFile : undefined} >{children}</a>
    );
}
