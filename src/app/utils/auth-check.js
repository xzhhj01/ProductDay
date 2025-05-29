export const requireAuth = (callback, showLoginModal) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('로그인 후에만 사용할 수 있는 기능입니다.');
    if (showLoginModal) {
      showLoginModal(true);
    }
    return false;
  }
  
  if (callback) {
    callback();
  }
  return true;
};