import type { FileAndEntry, ShouldUseThumbnailUrl } from './interface';
import type { UploadFileInfo, UploadSettledFileInfo } from './public-types';
export declare function isImageFileType(type: string): boolean;
export declare const isImageFile: ShouldUseThumbnailUrl;
export declare function createImageDataUrl(file: File): Promise<string>;
export declare const environmentSupportFile: false | {
    new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
    prototype: File;
};
export declare function isFileSystemDirectoryEntry(item: FileSystemEntry | FileSystemFileEntry | FileSystemDirectoryEntry): item is FileSystemDirectoryEntry;
export declare function isFileSystemFileEntry(item: FileSystemEntry | FileSystemFileEntry | FileSystemDirectoryEntry): item is FileSystemFileEntry;
export declare function getFilesFromEntries(entries: readonly FileSystemEntry[] | Array<FileSystemEntry | null>, directory: boolean): Promise<FileAndEntry[]>;
export declare function createSettledFileInfo(fileInfo: UploadFileInfo): UploadSettledFileInfo;
/**
 * This is a rather simple version. I may fix it later to make it more accurate.
 * I've looked at https://github.com/broofa/mime, however it doesn't has a esm
 * version, so I can't simply use it.
 */
export declare function matchType(name: string, mimeType: string, accept: string): boolean;
