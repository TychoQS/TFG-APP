import React, { useEffect, useState } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import './App.css';
import ClassificationLayout from './screens/classification/ClassificationLayout';
import { NavigationContext } from './navigation/context';
import NavigationMenu from './screens/navigation/NavigationMenu';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useAppNavigation } from './navigation/useAppNavigation';

const { Content } = Layout;

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const {
    route,
    currentAbstractPage,
    drawerOpen,
    navigation,
    handleNavigate,
    handleSwipe,
    handleSwipeClose,
    handleToggleMode,
    shouldShowMenuButton
  } = useAppNavigation();

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);


  return (
    <ConfigProvider theme={{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <NavigationContext.Provider value={navigation}>
        <Layout style={{ height: '100vh', position: 'relative' }}>

          {shouldShowMenuButton && (
            <Button
              icon={<MenuOutlined />}
              onClick={handleSwipe}
              style={{ position: 'absolute', top: 12, left: 16, zIndex: 10 }}
            />
          )}

          <NavigationMenu
            isOpen={drawerOpen}
            currentAbstractPage={currentAbstractPage}
            onSwipe={handleSwipe}
            onSwipeClose={handleSwipeClose}
            onNavigate={handleNavigate}
          />

          <Content style={{ height: '100%' }}>
            <ClassificationLayout
              currentMode={route}
              onToggle={handleToggleMode}
            />
          </Content>
        </Layout>
      </NavigationContext.Provider>
    </ConfigProvider>
  );
};

export default App;