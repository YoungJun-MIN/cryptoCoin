import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // 처음 한 번만 로컬 스토리지에서 테마를 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);  // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행되도록

  // 테마 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.getElementById('root').setAttribute('data-theme', theme);
  }, [theme]);  // theme가 변경될 때마다 로컬 스토리지에 저장

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);