export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}
export function logout() {
  console.log("inside logout");
  localStorage.removeItem('token');
}
