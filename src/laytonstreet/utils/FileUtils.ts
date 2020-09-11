import { IconName } from '@fortawesome/fontawesome-svg-core';
import { round } from './LsUtils';

export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return round(bytes / Math.pow(1024, i), { significantFigures: 3 }) + ' ' + sizes[i];
}

export function getExtention(file: File) {
    return file.name.substring(file.name.lastIndexOf(".") + 1);
}

export function getIconForFile(file: File): IconName {
    switch (getExtention(file)) {
        case "doc":
        case "docx":
            return "file-word";
        case "pdf":
            return "file-pdf";
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "bmp":
        case "tiff":
        case "svg":
            return "file-image";
        case "csv":
            return "file-csv";
        case "txt":
            return "file-alt";
        default:
            return "file";
    }
}

export function convertToBase64Url(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                let encoded = reader.result.toString();
                if (file.name.endsWith(".docx")) {
                    encoded = encoded.replace("application/octet-stream", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                }
                resolve(encoded);
            }
            resolve("");
        };
        reader.onerror = error => reject(error);
    });
}