export function download(url, name) {
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  if (name !== undefined) {
    a.download = name;
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
export function publicDownload(url, name) {
  download(url, name);
}