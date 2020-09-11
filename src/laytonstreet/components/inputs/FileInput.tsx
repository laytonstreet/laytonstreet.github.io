import * as React from 'react';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import FormGroup from 'reactstrap/lib/FormGroup';
import FormText from 'reactstrap/lib/FormText';
import Label from 'reactstrap/lib/Label';
import Media from 'reactstrap/lib/Media';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import { formatBytes, getIconForFile } from 'src/laytonstreet/utils/FileUtils';
import Icon from '../Icon';
import Validation, { Unfinished } from './Validation';
import Spinner from 'reactstrap/lib/Spinner';

type Props = {
    id: string
    value?: File,
    onValueChange?: (value?: File) => void,
    validation?: Validation,
    accept?: string,
    children?: string | React.Component | React.Component[],
}

export default function SingleFileInput({
    id,
    value,
    onValueChange,
    validation,
    accept,
    children: caption,
}: Props) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = value ? React.useState<File>(value) : React.useState<File>();
    const onFileChange = async (file?: File) => {
        setFile(file);
        onValueChange && onValueChange(file);
    };
    const openFileBrowser = onValueChange ? () => fileInputRef.current?.click() : undefined;
    const clearFile = onValueChange ? () => onFileChange(undefined) : undefined;

    function FileUploadArea({ file, validation }: { file?: File, validation?: Validation }) {
        const dragAndDropAreaRef = React.useRef<HTMLDivElement>(null);
        const [dragging, setDragging] = React.useState<boolean>(false);

        function Content() {
            if (file) {
                return (
                    <UploadedFile
                        file={file}
                        validation={validation}
                        onClear={clearFile}
                        onReplace={openFileBrowser} />
                );
            } else {
                return (
                    <div style={{ display: "inline-block" }}>
                        <p className="lead">{"Drag & drop a file here"}</p>
                        <p>or <a href="javascript:void(0)" onClick={openFileBrowser}>click here to browse</a></p>
                    </div>
                );
            }
        }

        const clasName = "FileUploadArea"
            + (file ? " withFile" : "")
            + (dragging ? " dragging" : "");

        return (
            <div ref={dragAndDropAreaRef}
                className={clasName}
                onDragEnter={(e) => {
                    if (e.dataTransfer && e.dataTransfer.items.length > 0) {
                        e.stopPropagation();
                        e.preventDefault();
                        setDragging(true);
                    }
                }}
                onDragLeave={(e) => {
                    if (e.currentTarget.className.includes("FileUploadArea")) {
                        e.stopPropagation();
                        setDragging(false);
                    }
                }}
                onDragOver={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onDrop={(e) => {
                    setDragging(false);
                    if (dragging && e.dataTransfer && e.dataTransfer.files.length > 0) {
                        e.stopPropagation();
                        e.preventDefault();
                        onFileChange(e.dataTransfer.files[0]);
                        e.dataTransfer.clearData();
                    }
                }} >
                {dragging && <div className="overlay" />}
                <Content/>
            </div>
        );
    }

    return (
        <FormGroup className="SingleFileInput">
            {caption && <Label for={id}>{caption}</Label>}
            <input id={id}
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept={accept}
                    onChange={(e) => onFileChange((e.target.files || [])[0])} />
            <FileUploadArea file={file} validation={validation} />
        </FormGroup>
    );
}

type UploadedFileProps = {
    file: File,
    validation?: Validation,
    onClear?: () => void,
    onReplace?: () => void
}

function UploadedFile({ file, validation, onClear, onReplace }: UploadedFileProps) {
    const downloadLinkRef = React.createRef<HTMLAnchorElement>();
    const onView = () => {
        const blobUrl = URL.createObjectURL(file);
        let anchorElement = downloadLinkRef.current;
        if (anchorElement) {
            anchorElement.href = blobUrl;
            anchorElement.click();
        }
    }

    const ValidationMessage = function() {
        if (!validation) {
            return null;
        } else if (validation instanceof Unfinished) {
            return (
                <FormText style={{display: "inline-flex", width: "auto"}} color="muted">
                    <Spinner size="1em"/>{" " + validation.message}
                </FormText>
            );
        } else {
            return (
                <FormFeedback valid={validation.valid} style={{ display: "inline-flex" }}>
                    {validation.message}
                </FormFeedback>
            );
        }
    };

    return (
        <div className="UploadedFile">
            <Media>
                <Media left>
                    <Icon icon={getIconForFile(file)} className="fileIcon"/>
                </Media>
                <Media body>
                    <div>{file.name}</div>
                    <div style={{display: "flex"}}>
                        <FormText style={{display: "inline-flex", width: "4em"}} color="muted">
                            {formatBytes(file.size)}
                        </FormText>
                        <div style={{display: "inline-flex"}}>
                            <ValidationMessage/>
                        </div>
                    </div>
                    <a ref={downloadLinkRef} download={file.name} hidden />
                    <Nav className="ActionList">
                        <Action onClick={onView}>View</Action>
                        {onClear && <Action onClick={onView}>Remove</Action>}
                        {onReplace && <Action onClick={onView}>Replace</Action>}
                    </Nav>
                </Media>
            </Media>
        </div>
    );
}

function Action({ children: name, onClick }: { children: String, onClick: () => void }) {
    return (
        <NavItem><NavLink href="javascript:void(0)" onClick={onClick}>{name}</NavLink></NavItem>
    );
}