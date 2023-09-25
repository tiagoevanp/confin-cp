export const useAvatar = (name: string): string => {
  // TODO: server side call to get avatar

  return `https://ui-avatars.com/api/?background=56A0A0&color=fff&name=${name}`;
};
