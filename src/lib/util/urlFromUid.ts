const urlFromUid = (uid: string) =>
  uid ? "/" + (uid === "home" ? "" : uid.replace(/\./g, "/")) : null;

export default urlFromUid;
