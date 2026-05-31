var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { isBrowser } from "../../_utils/index.mjs";
import { error } from "../../_utils/naive/warn.mjs";
export function isImageFileType(type) {
  return type.includes('image/');
}
function getExtname(url = '') {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
}
const imageExtensionRegex = /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i;
// Do not need File object
export const isImageFile = file => {
  if (file.type) {
    return isImageFileType(file.type);
  }
  const fileNameExtension = getExtname(file.name || '');
  if (imageExtensionRegex.test(fileNameExtension)) {
    return true;
  }
  const url = file.thumbnailUrl || file.url || '';
  const urlExtension = getExtname(url);
  if (/^data:image\//.test(url) || imageExtensionRegex.test(urlExtension)) {
    return true;
  }
  return false;
};
export function createImageDataUrl(file) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield new Promise(resolve => {
      if (!file.type || !isImageFileType(file.type)) {
        resolve('');
        return;
      }
      resolve(window.URL.createObjectURL(file));
    });
  });
}
export const environmentSupportFile = isBrowser && window.FileReader && window.File;
export function isFileSystemDirectoryEntry(item) {
  return item.isDirectory;
}
export function isFileSystemFileEntry(item) {
  return item.isFile;
}
export function getFilesFromEntries(entries, directory) {
  return __awaiter(this, void 0, void 0, function* () {
    const fileAndEntries = [];
    function _getFilesFromEntries(entries) {
      return __awaiter(this, void 0, void 0, function* () {
        for (const entry of entries) {
          if (!entry) continue;
          if (directory && isFileSystemDirectoryEntry(entry)) {
            const directoryReader = entry.createReader();
            let allEntries = [];
            let readEntries;
            try {
              do {
                readEntries = yield new Promise((resolve, reject) => {
                  directoryReader.readEntries(resolve, reject);
                });
                allEntries = allEntries.concat(readEntries);
              } while (readEntries.length > 0);
            } catch (e) {
              error('upload', 'error happens when handling directory upload', e);
            }
            yield _getFilesFromEntries(allEntries);
          } else if (isFileSystemFileEntry(entry)) {
            try {
              const file = yield new Promise((resolve, reject) => {
                entry.file(resolve, reject);
              });
              fileAndEntries.push({
                file,
                entry,
                source: 'dnd'
              });
            } catch (e) {
              error('upload', 'error happens when handling file upload', e);
            }
          }
        }
      });
    }
    yield _getFilesFromEntries(entries);
    return fileAndEntries;
  });
}
export function createSettledFileInfo(fileInfo) {
  const {
    id,
    name,
    percentage,
    status,
    url,
    file,
    thumbnailUrl,
    type,
    fullPath,
    batchId
  } = fileInfo;
  return {
    id,
    name,
    percentage: percentage !== null && percentage !== void 0 ? percentage : null,
    status,
    url: url !== null && url !== void 0 ? url : null,
    file: file !== null && file !== void 0 ? file : null,
    thumbnailUrl: thumbnailUrl !== null && thumbnailUrl !== void 0 ? thumbnailUrl : null,
    type: type !== null && type !== void 0 ? type : null,
    fullPath: fullPath !== null && fullPath !== void 0 ? fullPath : null,
    batchId: batchId !== null && batchId !== void 0 ? batchId : null
  };
}
/**
 * This is a rather simple version. I may fix it later to make it more accurate.
 * I've looked at https://github.com/broofa/mime, however it doesn't has a esm
 * version, so I can't simply use it.
 */
export function matchType(name, mimeType, accept) {
  name = name.toLowerCase();
  mimeType = mimeType.toLocaleLowerCase();
  accept = accept.toLocaleLowerCase();
  const acceptAtoms = accept.split(',').map(acceptAtom => acceptAtom.trim()).filter(Boolean);
  return acceptAtoms.some(acceptAtom => {
    if (acceptAtom.startsWith('.')) {
      // suffix
      if (name.endsWith(acceptAtom)) return true;
    } else if (acceptAtom.includes('/')) {
      // mime type
      const [type, subtype] = mimeType.split('/');
      const [acceptType, acceptSubtype] = acceptAtom.split('/');
      if (acceptType === '*' || type && acceptType && acceptType === type) {
        if (acceptSubtype === '*' || subtype && acceptSubtype && acceptSubtype === subtype) {
          return true;
        }
      }
    } else {
      // invalid type
      return true;
    }
    return false;
  });
}