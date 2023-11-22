export const convertString = (data: string): Uint8Array => {
  const bianryString = atob(data);
  const uint8Array = new Uint8Array(bianryString.length);
  for (let i = 0; i < bianryString.length; i++) {
    uint8Array[i] = bianryString.charCodeAt(i);
  }
  return uint8Array;
};
